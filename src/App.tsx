import {BrowserRouter, Route} from 'react-router-dom';
import { ToastContainer } from "react-toastify"; // Importamos o Toastify

import {Home} from "./pages/Home";
import {NewRoom} from "./pages/NewRoom";
import {Room} from "./pages/Room";

import {AuthContextProvider} from './contexts/AuthContext';

import "react-toastify/dist/ReactToastify.css"; // O estilo do Toastify

function App() {

    return (
        <BrowserRouter>
            <ToastContainer autoClose={3000} />
            <AuthContextProvider>
                <switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/rooms/new" component={NewRoom}/>
                    <Route path="/rooms/:id" component={Room}/>
                </switch>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default App;
