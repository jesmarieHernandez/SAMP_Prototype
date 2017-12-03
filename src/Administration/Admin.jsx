import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';
import {Button, Glyphicon, Table, Panel, Pagination, Col, Jumbotron} from 'react-bootstrap';

const PAGE_SIZE = 10;

class Admin extends Component {
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
            <div className="container">
                {/*<Jumbotron><h3>Admin Panel</h3></Jumbotron>*/}
                <ol className="breadcrumb">
                    <li/>
                    <li className="active">Admin Panel</li>
                </ol>
{/*                <Col md={3}>
                    <Panel collapse header='Admin Panel'>
                        <ul>
                            <li ><Link to={`/admin/organizations`}>Manage Organizations</Link></li>
                            <li ><Link to={`/admin/facilities`}>Manage Facilities</Link></li>
                            <li ><Link to={`/admin/users`}>Manage Users</Link></li>

                        </ul>
                    </Panel>
                </Col>*/}
                <Col md={12}>
                    <Panel collapse header='Admin Panel'>
                        <ul>
                            <li ><Link to={`/admin/organizations`}>Manage Organizations</Link></li>
                            <li ><Link to={`/admin/facilities`}>Manage Facilities</Link></li>
                            <li ><Link to={`/admin/users`}>Manage Users</Link></li>
                        </ul>
                    </Panel>

                </Col>
                <Col md={3}></Col>


            </div>
        )
    }
}

Admin.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Admin;