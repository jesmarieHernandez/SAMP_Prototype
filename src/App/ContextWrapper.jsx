import React, { Component } from 'react';

export default class ContextWrapper extends Component {

    getChildContext() {
        console.log('this.props: ' + this.props);
        return { initialState: this.props.initialState };
    }

    render() {
        console.log(this.props);
        return this.props.children;
    }
}

ContextWrapper.childContextTypes = {
    initialState: React.PropTypes.object,
};

ContextWrapper.propTypes = {
    children: React.PropTypes.object.isRequired,
    initialState: React.PropTypes.object,
};
