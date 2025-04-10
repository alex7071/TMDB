import React, {Component} from "react";

export default class Comments extends Component {
    constructor(props) {
        super(props);
        
        this.state = {comments: props.comments, timestamp: props.timestamp};
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.timestamp !== this.props.timestamp) {
            this.setState({ comments: this.props.comments });
        }
    }
    
    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', maxHeight: 500, overflow: 'auto'}}>
                {this.state.comments.map((comment, i) => {
                    return <div key={i} style={{border: '1px solid gray', margin: 5, paddingLeft: 5}}>
                        <p>User: {comment.userName}</p>
                        <p>{comment.text}</p>
                    </div>
                })}
            </div>
        );
    }
}