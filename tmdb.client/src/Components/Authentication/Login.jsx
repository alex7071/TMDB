import React, { Component } from 'react';
import './Login.css';
import {useAuth, useNavigateWrapper} from "@/AuthProvider.jsx";

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
    
    handleSubmitEvent(e) {
        e.preventDefault();
        if (this.state.email !== "" && this.state.password !== "") {
            this.props.auth.loginAction(this.state).then(response => {
                if (response.status === 401) {
                    alert('Invalid login');
                }
            }).catch((err) => {
                console.log(err, 'reach here');
            });
            return;
        }
        alert("please provide a valid input");
    }

    handleInput(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
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
                        Please enter a valid username. It must contain at least 6 characters.
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
                <button className="button">Submit</button>
            </form>
        );
    }
}

export default useNavigateWrapper(useAuth(LoginComponent));