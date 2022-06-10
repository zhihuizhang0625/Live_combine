import React, { Component } from 'react';
import {Router, Route, Link, Switch } from 'react-router-dom';
import Header from './Header'
import StreamCreate from './streams/StreamCreate'
import StreamShow from './streams/StreamShow'
import StreamList from './streams/StreamList'
import StreamStart from './streams/StreamStart';
// import StreamDelete from './streams/StreamDelete'
// import StreamEdit from './streams/streamEdit'
import history from '../history'
import 'bootswatch/dist/darkly/bootstrap.min.css'
import Signin from './auth/Signin';
import Register from './auth/Register';
import BusinessRegister from './auth/BusinessRegister';

const App =() =>{
    return (
        <div className="ui cointainer">
            <Router history={history}>
             <div>
                <Header />
                <Switch>
                <Route path="/" exact component={StreamList}></Route>
                <Route path="/signin" exact component={Signin}></Route>
                <Route path="/register" exact component={Register}></Route>
                <Route path="/business/register" exact component={BusinessRegister}></Route>
                <Route path="/streams/new" exact component={StreamCreate}></Route>
                <Route path="/streams/start/:businessId" exact component={StreamStart}></Route>
                {/* <Route path="/streams/edit/:id" exact component={StreamEdit}></Route>
                <Route path="/streams/delete/:id" exact component={StreamDelete}></Route> */}
                <Route path="/streams/:id" exact component={StreamShow}></Route>
                </Switch>
             </div>
            </Router>
        </div>
    )
}
export default App;