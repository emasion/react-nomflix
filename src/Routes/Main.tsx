import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Tv from "./Tv";
import Search from "./Search";
import Home from "./Home";
import Header from "../Components/Header";
import React from "react";

function Main() {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path={["/tv", "/tv/*"]}>
                    <Tv/>
                </Route>
                <Route path="/search">
                    <Search/>
                </Route>
                <Route path={["/", "/movie/*"]}>
                    <Home/>
                </Route>
            </Switch>
        </Router>
    )
}
export default Main