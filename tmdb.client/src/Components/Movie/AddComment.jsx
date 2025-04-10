import React, {Component} from "react";

export default class AddComment extends Component {

    handleInput(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    
    render () {
        return (
            <div style={{display: 'flex', margin: 10, alignItems: 'flex-start'}}>
                <textarea name="comment" style={{width: '90%', height: 100, marginRight: 10}} onChange={e => this.handleInput(e)} />
                <button onClick={e => this.addComment()}>Add comment</button>
            </div>
        );
    }
}