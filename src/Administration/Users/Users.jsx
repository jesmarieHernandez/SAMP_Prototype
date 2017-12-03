import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';
import {Button, Glyphicon, Table, Panel, Pagination, Col, Jumbotron} from 'react-bootstrap';

const PAGE_SIZE = 10;

class Users extends Component {
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
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('/api/users').then(response => {
            if (response.ok) {
                response.json().then(results => {
                    //console.log(results);
                    this.setState({users: results});
                    console.log(this.state.users);
                    //this.props.router.push(`/activities/${createdRequest._id}`);
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            this.props.showError(`Error in sending data to server: ${err.message}`);
        });
    }

    render() {
        const users = this.state.users.map(users =>

            <Col md={12}>

                <Panel collapsible header={users.firstName + ' ' + users.lastName}>
                    <p>Role: {users.role}</p>
                    <p>Email: {users.email}</p>
                    <p>Creation Date: {users.creationDate}</p>
                    <Link to={`/admin/users/${users._id}`}><Button className="btn btn-primary">Details</Button></Link>
                </Panel>

            </Col>
        );
        return (
            <div className="container">
                {/*<Jumbotron><h3>Admin Panel</h3></Jumbotron>*/}
                <ol className="breadcrumb">
                    <li/>
                    <li><Link to={`/admin/`}>Admin Panel</Link></li>
                    <li className="active">Users</li>
                </ol>
                <Col md={3}>
                    <Panel header='Manage Users'>
                        <ul>
                            <li><Link to={`/admin/users/create`}>Create New User</Link></li>
                            <li>Edit Existing User</li>
                        </ul>
                    </Panel>
                </Col>
                <Col md={6}>
                    <Panel header='Users'>

                    </Panel>
                    {users}

                </Col>
                <Col md={3}></Col>


            </div>
        )
    }
}

Users.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Users;