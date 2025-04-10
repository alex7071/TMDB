import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user") || "");
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const loginAction = async (data) => {
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if (res.accessToken) {
                
                setToken(res.accessToken);
                localStorage.setItem("site", res.accessToken);

                const userDetailsReponse = await fetch('/user/GetUserName', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('site')
                    }
                });
                const userName = await userDetailsReponse.text();
                localStorage.setItem("user", userName);
                setUser(userName);
                
                navigate("/");
                return;
            } else {
                return response;
            }
            throw new Error(res.message);
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = (Component) => (props) => {
    const useAuth = useContext(AuthContext);
    return <Component {...props} auth={useAuth} />;
};

export const useNavigateWrapper = (Component) => (props) => {
    const navigate = useNavigate();
    return <Component {...props} auth={useAuth} navigate={navigate} />
};