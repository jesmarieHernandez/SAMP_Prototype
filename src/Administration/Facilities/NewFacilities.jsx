import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron
} from 'react-bootstrap';


const PAGE_SIZE = 10;

class CreateFacilities extends Component {
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

        // this.state = {
        //     eventDate: value,
        //     theValue: {},
        //     organizationName: '',
        //     selectedOrganizationInfo:
        //         {
        //             organizationName: '',
        //             organizationAcronym: '',
        //             counselorFirstName: '',
        //             counselorLastName: '',
        //             counselorAddress: '',
        //             counselorPhone: ''
        //         },
        //     requestedFacilitiesInfo: {},
        //     invalidFields: {}, showingValidation: false,
        // };
    }

    onSubmit(event) {
        event.preventDefault();

        console.log('Form was submitted');

        //this.showValidation();

        // if (Object.keys(this.state.invalidFields).length !== 0) {
        //     return;
        // }
        const form = document.forms.newFacilities;


        const newFacilities = {
            name: form.facilitiesName.value,
            building: form.buildingName.value,
            creationDate: new Date(),
            managerName: form.facilitiesManagerName.value,
            managerEmail: form.facilitiesManagerEmail.value,
        };



        console.log(newFacilities);
        fetch('/api/facilities', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newFacilities),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createdFacilities => {
                    console.log('New facilities were created successfully!');
                    console.log('Facilities ID: ' + createdFacilities._id);

/*
                    this.props.router.push(`/admin/facilities/${createdFacilities._id}/`);
*/
                    this.props.router.push(`/facilities/${createdFacilities._id}/`);
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
                    <li ><Link to={`/admin/facilities`}>Facilities</Link></li>
                    <li className="active">Create New Facilities</li>
                </ol>
{/*                <Col md={3}>
                    <Panel header='Instructions'>
                        /!*<td><Link to={`/activities/1`}>Hello</Link></td>*!/

                        <p>Facilities Name</p>
                        <p>Facilities Manager</p>
                        <p>Facilities Manager Email</p>
                    </Panel>
                </Col>*/}

                <Col md={12}>
                    {/*<div onClick={this.onSubmit}><Button>Request</Button></div>*/}
                    <Panel header="Create New Facilities">
                        <Form horizontal onSubmit={this.onSubmit} name="newFacilities">
                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Facilities Name</Col>
                                    <FormControl name="facilitiesName"/>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Building Name</Col>
                                    <FormControl name="buildingName"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Manager Name</Col>
                                    <FormControl name="facilitiesManagerName"/>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Manager Email</Col>
                                    <FormControl name="facilitiesManagerEmail"/>
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


CreateFacilities.contextTypes = {
    initialState: React.PropTypes.object,
};

export default CreateFacilities;