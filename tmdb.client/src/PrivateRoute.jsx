import React, {Component} from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "@/AuthProvider.jsx";

class PrivateRouteComponent extends Component {
    render() {
        if (!this.props.auth.token) {
            return (<Navigate to="/" />);
        }
        
        return (<Outlet />);
    }
}

export default useAuth(PrivateRouteComponent);