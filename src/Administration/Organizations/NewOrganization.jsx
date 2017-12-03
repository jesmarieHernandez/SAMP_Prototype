import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron
} from 'react-bootstrap';


const PAGE_SIZE = 10;

class CreateOrganization extends Component {
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
        const form = document.forms.newOrganization;


        const newOrganization = {
            name: form.organizationName.value,
            type: form.organizationType.value,
            initials: form.organizationInitials.value,
            creationDate: new Date(),
            counselorName: form.organizationCounselorName.value,
            counselorEmail: form.organizationCounselorEmail.value,
            counselorTelephone: form.organizationCounselorTelephone.value,
            counselorFaculty: form.organizationCounselorFaculty.value,
            counselorDepartment: form.organizationCounselorDepartment.value,
            counselorOfficeNumber: form.organizationCounselorOfficeNumber.value

        };



        console.log(newOrganization);
        fetch('/api/organizations', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newOrganization),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createdOrganization => {
                    console.log('New organization was created successfully!');
                    console.log('Organization ID: ' + createdOrganization._id);

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
                    <li ><Link to={`/admin/organizations`}>Organizations</Link></li>
                    <li className="active">Create New Organization</li>
                </ol>
                <Col md={3}>
                    <Panel header='Instructions'>
                        {/*<td><Link to={`/activities/1`}>Hello</Link></td>*/}

                        <p>Organization Name</p>
                        <p>Organization Type</p>
                        <p>Counselor Name</p>
                        <p>Counselor Email</p>

                    </Panel>
                </Col>

                <Col md={9}>
                    <Panel header="Create New Organization">
                        <Form horizontal onSubmit={this.onSubmit} name="newOrganization">
                            <FormGroup>
                                <Col sm={5}>
                                    <Col componentClass={ControlLabel}>Organization Name</Col>
                                    <FormControl name="organizationName"/>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Organization Type</Col>
                                    <FormControl name="organizationType"/>
                                </Col>

                                <Col sm={3}>
                                    <Col componentClass={ControlLabel}>Organization Initials</Col>
                                    <FormControl name="organizationInitials"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Name</Col>
                                    <FormControl name="organizationCounselorName"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Email</Col>
                                    <FormControl name="organizationCounselorEmail"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Telephone</Col>
                                    <FormControl name="organizationCounselorTelephone"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Faculty</Col>
                                    <FormControl name="organizationCounselorFaculty"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Department</Col>
                                    <FormControl name="organizationCounselorDepartment"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Counselor Office Number</Col>
                                    <FormControl name="organizationCounselorOfficeNumber"/>
                                </Col>
                            </FormGroup>

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


CreateOrganization.contextTypes = {
    initialState: React.PropTypes.object,
};

export default CreateOrganization;