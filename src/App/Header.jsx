import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';
import {Navbar, Nav, NavItem, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {Button, Glyphicon, Table, Panel, Pagination} from 'react-bootstrap';

const PAGE_SIZE = 10;

class Header extends Component {
    static dataFetcher({urlBase, location}) {
        const query = Object.assign({}, location.query);
        const pageStr = query._page;
        if (pageStr) {
            delete query._page;
            query._offset = (parseInt(pageStr, 10) - 1) * PAGE_SIZE;
        }
        query._limit = PAGE_SIZE;
        const search = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
        // return fetch(`${urlBase || ''}/api/issues?${search}`).then(response => {
        //     if (!response.ok) return response.json().then(error => Promise.reject(error));
        //     return response.json().then(data => ({IssueList: data}));
        // });
        return {IssueList: {}};

    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Navbar fluid>
                <Col sm={5}>
                    <Link to="/home">
                        <Navbar.Header>
                            <Navbar.Brand>SAMP</Navbar.Brand>
                        </Navbar.Header>
                    </Link>
                    <Nav>
                        <LinkContainer to="/home">
                            <NavItem>Home</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/request">
                            <NavItem>Request</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/activities">
                            <NavItem>Activities</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/stats">
                            <NavItem>Stats</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/admin">
                            <NavItem>Admin Panel</NavItem>
                        </LinkContainer>
                    </Nav>
                </Col>
            </Navbar>
        )
    }
}

Header.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Header;