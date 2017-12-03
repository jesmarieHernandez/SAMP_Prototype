import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron
} from 'react-bootstrap';


const PAGE_SIZE = 10;

class CreateUser extends Component {
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

    onSubmit(event) {
        event.preventDefault();

        console.log('Form was submitted');

        //this.showValidation();

        // if (Object.keys(this.state.invalidFields).length !== 0) {
        //     return;
        // }
        const form = document.forms.newUser;


        const newUser = {
            firstName: form.userFirstName.value,
            lastName: form.userLastName.value,
            email: form.userEmail.value,
            role: form.userRole.value,
            creationDate: new Date(),

        };



        console.log(newUser);
        fetch('/api/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createdUser => {
                    console.log('New user was created successfully!');
                    console.log('User ID: ' + createdUser._id);

                    //this.props.router.push(`/activities/${createdRequest._id}`);
                })
            } else {
                response.json().then(error => {
                    //this.props.showError(`Failed to create request: ${error.message}`);
                });
            }
        }).catch(err => {
            //this.props.showError(`Error in sending data to server: ${err.message}`);
        });
    }


    render() {

        return (
            <div className="container">
                {/*<Jumbotron><h3>Request New Activity</h3></Jumbotron>*/}
                <ol className="breadcrumb">
                    <li/>
                    <li ><Link to={`/admin`}>Admin Panel</Link></li>
                    <li ><Link to={`/admin/users`}>Users</Link></li>
                    <li className="active">Create New User</li>
                </ol>
                <Col md={3}>
                    <Panel header='Instructions'>
                        {/*<td><Link to={`/activities/1`}>Hello</Link></td>*/}

                        <p>User Role</p>
                        <p>User First Name</p>
                        <p>User Last Name</p>
                        <p>User Email</p>
                        {/*<p>User Password</p>*/}

                    </Panel>
                </Col>

                <Col md={9}>
                    {/*<div onClick={this.onSubmit}><Button>Request</Button></div>*/}
                    <Panel header="Create New User">
                        <Form horizontal onSubmit={this.onSubmit} name="newUser">
                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Role</Col>
                                    <FormControl name="userRole"/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>First Name</Col>
                                    <FormControl name="userFirstName"/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Last Name</Col>
                                    <FormControl name="userLastName"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Email</Col>
                                    <FormControl name="userEmail"/>
                                </Col>
                            </FormGroup>
                            {/*<FormGroup>*/}
                                {/*<Col sm={4}>*/}
                                    {/*<Col componentClass={ControlLabel}>Password</Col>*/}
                                    {/*<FormControl name="userPassword"/>*/}
                                {/*</Col>*/}
                            {/*</FormGroup>*/}

                            <ButtonToolbar>
                                <Col md={6}>
                                    <Button bsStyle="primary" type="submit">
                                        Submit </Button>
                                </Col>
                            </ButtonToolbar>
                        </Form>
                    </Panel>
                </Col>
                <Col md={2}></Col>
            </div>
        )
    }
}


CreateUser.contextTypes = {
    initialState: React.PropTypes.object,
};

export default CreateUser;