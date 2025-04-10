import './App.css';
import {Layout} from "@/Components/Layout.jsx";
import {Route, Routes} from 'react-router-dom';
import {Home} from "@/Components/Home.jsx";
import './custom.css'
import { MovieDetails } from "@/Components/Movie/MovieDetails.jsx";
import Login from "@/Components/Authentication/Login.jsx";
import AuthProvider from "@/AuthProvider.jsx";
import Register from "@/components/Authentication/Register.jsx";

function App() {
    return (
        <AuthProvider>
            <Layout>
                <Routes>
                    <Route exact path='/' Component={Home} />
                    <Route path='/movie/:id' Component={MovieDetails} />
                    <Route path='/signin' Component={Login} />
                    <Route path='/signup' Component={Register} />
                </Routes>
            </Layout>
        </AuthProvider>
    );
}

export default App;