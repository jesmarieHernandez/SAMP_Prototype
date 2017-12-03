import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import Header from "./Header.jsx";

export default class App extends React.Component {

    static dataFetcher({urlBase, cookie}) {
        console.log(urlBase);
        console.log(cookie);

        const headers = cookie ? {headers: {Cookie: cookie}} : null;
        return fetch(`${urlBase || ''}/api/users/me`, headers).then(response => {
            if (!response.ok) return response.json().then(error => Promise.reject(error));
            return response.json().then(data => ({App: data}));
        });
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {}
        }
    }


    render() {
        console.log('this.props.children' + this.props.children);
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.object.isRequired
};

App.contextTypes = {
    initialState: React.PropTypes.object
};