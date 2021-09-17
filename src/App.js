import "./App.css";
import {  useState } from "react";
import { useHttpClient } from './Shared/Hooks/HttpHook';


import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import AuthHandler from "./Utils/Common";

function App() {
    const { getToken } = AuthHandler();
    const { isLoading} = useHttpClient();

    const [token, setToken] = useState(getToken());

    let routes;
    if (token) {
        routes = (
            <Switch >
                <Route path="/"
                    exact component={() => (<Home setToken={setToken} />)}
                />
                <Redirect to="/" />
            </Switch>

        );
    } else {
        routes = (
            <Switch >
                <Route path="/login" setToken={setToken} exact component={() => (<Login setToken={setToken} />)} />
                <Redirect to="/login" />
            </Switch>
        );
    }

    return (
        <>
            {isLoading ?
                <div className="centered">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> :
                <div className="App"> {routes} </div>
            };
        </>
    )
}

export default App;