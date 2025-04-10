import React, { Component } from 'react';
import {useAuth, useNavigateWrapper} from "@/AuthProvider.jsx";
import './Register.css'

class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            repeatpassword: ""
        }
    }

    handleInput(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async handleSubmitEvent(e) {
        e.preventDefault();
        
        if (this.state.email !== "" && this.state.password !== "") {
            
            if (this.state.password !== this.state.repeatpassword) {
                alert('Password must match');
                return;
            }

            const data = {
                email: this.state.email,
                password: this.state.password
            };
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.status === 200) {
                this.props.auth.loginAction(this.state).catch((err) => {console.log(err)});
            }
            
            // this.props.auth.loginAction(this.state).catch((err) => {console.log(err)});
            return;
        }
        alert("please provide a valid input");
    }
    
    render() {
        return (
            <form onSubmit={e => {
                this.handleSubmitEvent(e)}}>
                <div className="form_control">
                    <label htmlFor="user-email">Email:</label>
                    <input
                        type="email"
                        id="user-email"
                        name="email"
                        placeholder="example@yahoo.com"
                        aria-describedby="user-email"
                        aria-invalid="false"
                        onChange={e => this.handleInput(e)}
                    />
                    <div id="user-email" className="sr-only">
                        Please enter a valid email.
                    </div>
                </div>
                <div className="form_control">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        aria-describedby="user-password"
                        aria-invalid="false"
                        onChange={e => this.handleInput(e)}
                    />
                    <div id="user-password" className="sr-only">
                        Your password should be more than 6 character
                    </div>
                </div>
                <div className="form_control">
                    <label htmlFor="repeatpassword">Repeat password:</label>
                    <input
                        type="password"
                        id="repeatpassword"
                        name="repeatpassword"
                        aria-describedby="user-password"
                        aria-invalid="false"
                        onChange={e => this.handleInput(e)}
                    />
                </div>
                <button className="button">Submit</button>
            </form>
        );
    }
}

export default useNavigateWrapper(useAuth(Register));