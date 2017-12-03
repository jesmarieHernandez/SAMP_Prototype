import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Row
} from 'react-bootstrap';


const PAGE_SIZE = 10;

class ActivityDetail extends Component {
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
            activity: {
                _id: 0,
                requestTitle: '',
                activityDescription: '',
                activityGuest: '',
                activityAssistant: '',
                selectedDate: '',
                startTime: '',
                endTime: '',
                organization: {},
                organizationInitials: '',
                requesterName: '',
                studentIdentificationNumber: '',
                studentRole: '',
                studentAddress1: '',
                studentAddress2: '',
                studentAddressCity: '',
                studentAddressState: '',
                studentAddressCountry: '',
                studentAddressZipCode: '',
                studentTelephone: '',
                counselor: {},
                counselorTelephone: '',
                counselorFaculty: '',
                counselorDepartment: '',
                counselorOfficeNumber: '',
                requestDate: '',
                facilities: {},
                status: ''
            }

        }
        this.onApproval = this.onApproval.bind(this);
        this.onDenied = this.onDenied.bind(this);
    }


    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.params.id);
        let id = this.props.params.id;
        fetch(`/api/activities/${id}`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({activity: data});
                console.log(this.state.activity._id);
            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        })
    }

    onSubmit(event) {
        event.preventDefault();

        console.log('Form was submitted');

        //this.showValidation();

        // if (Object.keys(this.state.invalidFields).length !== 0) {
        //     return;
        // }
        const form = document.forms.activityRequest;

        const activityRequest = {
            requestTitle: form.requestTitle.value,
            activityDescription: form.activityDescription.value,
            activityGuest: form.activityGuest.value,
            activityAssistant: form.activityAssistant.value,
            selectedDate: this.state.selectedDate,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            organization: this.state.selectedOrganization,
            organizationInitials: form.organizationInitials.value,
            requesterName: form.requesterName.value,
            studentIdentificationNumber: form.studentIdentificationNumber.value,
            studentRole: form.studentRole.value,
            studentAddress1: form.studentAddress1.value,
            studentAddress2: form.studentAddress2.value,
            studentAddressCity: form.studentAddressCity.value,
            studentAddressState: form.studentAddressState.value,
            studentAddressCountry: form.studentAddressCountry.value,
            studentAddressZipCode: form.studentAddressZipCode.value,
            studentTelephone: form.studentTelephone.value,
            /*
             building: this.state.selectedBuilding,
             */
            counselor: this.state.selectedCounselor,
            counselorTelephone: form.counselorTelephone.value,
            counselorFaculty: form.counselorFaculty.value,
            counselorDepartment: form.counselorDepartment.value,
            counselorOfficeNumber: form.counselorOfficeNumber.value,
            requestDate: new Date(),
            facilities: this.state.selectedFacilities,
            status: this.state.selectedStatus
        };


        console.log(activityRequest);
        fetch('/api/activities', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(activityRequest),
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(createdRequest => {
                    console.log('Activity request was created successfully!');
                    console.log('Activity request ID: ' + createdRequest._id);

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

    onApproval() {
        console.log("This thing was clicked");

        fetch(`/api/activities/${ this.state.activity._id}/approve`, {
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(approvedActivity => {
                    console.log('Activity request status: ' + approvedActivity.status);

                    this.props.router.push(`/activities/${approvedActivity._id}`);
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

    onDenied() {
        console.log("This thing was denied");

        fetch(`/api/activities/${ this.state.activity._id}/deny`, {
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                console.log(response);
                response.json().then(deniedActivity => {
                    console.log('Activity request status: ' + deniedActivity.status);

                    this.props.router.push(`/activities/${deniedActivity._id}`);
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
        console.log(this.state.activity.status);
        return (
            <div className="container">
                {/*<Jumbotron><h3>Activity Details</h3></Jumbotron>*/}
                <ol className="breadcrumb">
                    <li/>
                    <li ><Link to={`/activities/`}>Activities</Link></li>
                    <li className="active">Activity Details</li>
                </ol>
                <Col md={2}>
            </Col>
                <Col md={12}>

                    <Panel  header={this.state.activity.requestTitle}>
                        {/*<td><Link to={`/activities/${this.state.activity._id}`}>{this.state.activity.requestTitle}</Link></td>*/}
                        <p><b>Organization Name:</b> {this.state.activity.organization.name}</p>
                        <p><b>Organization Initials:</b> {this.state.activity.organizationInitials}</p>
                        <br/>
                        <p><b>Requested Facility:</b> {this.state.activity.facilities.name}</p>
                        <p><b>Activity Description:</b> {this.state.activity.activityDescription}</p>
                        <p><b>Activity Guest(s):</b> {this.state.activity.activityGuest}</p>
                        <p><b>Activity Assistants:</b> {this.state.activity.activityAssistant}</p>
                        <p><b>Activity Date:</b> {this.state.activity.selectedDate}</p>
                        <p><b>Activity Start Time:</b> {this.state.activity.startTime}</p>
                        <p><b>Activity End Time:</b> {this.state.activity.endTime}</p>
                        <br/>
                        <p><b>Requester Name:</b> {this.state.activity.requesterName}</p>
                        <p><b>Requester Identification Number:</b> {this.state.activity.studentIdentificationNumber}</p>
                        <p><b>Requester Role:</b> {this.state.activity.studentRole}</p>
                        <p><b>Requester Address:</b> {this.state.activity.studentAddress1} {this.state.activity.studentAddress2} {this.state.activity.studentAddressCity} {this.state.activity.studentAddressState} {this.state.activity.studentAddressCountry} {this.state.activity.studentAddressZipCode}</p>
                        <p><b>Requester Telephone:</b> {this.state.activity.studentTelephone}</p>
                        <br/>
                        <p><b>Counselor Name:</b> {this.state.activity.counselorName}</p>
                        <p><b>Counselor Telephone:</b> {this.state.activity.counselorTelephone}</p>
                        <p><b>Counselor Faculty:</b> {this.state.activity.counselorFaculty}</p>
                        <p><b>Counselor Department:</b> {this.state.activity.counselorDepartment}</p>
                        <p><b>Counselor Office Number:</b> {this.state.activity.counselorOfficeNumber}</p>
                        <p><b>Counselor Email:</b> {this.state.activity.counselorEmail}</p>
                        <br/>
                        <div align="center">
                            <p><b>Status:</b> {this.state.activity.status}</p>
                            <p><b>Request Submission Date:</b> {this.state.activity.requestDate}</p>
                        </div>


                        <Row>
                            {(this.state.activity.status === 'pending')  ?
                                (<div>
                                    <Col md="1"><Link to={`/activities/`}><Button className="btn btn-primary">Back</Button></Link></Col>
                                    <Col md="1"><Button className="btn-success" onClick={this.onApproval}>Approve</Button></Col>
                                    <Col md="1"><Button className="btn-danger"  onClick={this.onDenied}>Decline</Button></Col>
                                </div>) :
                                (<div>
                                    <Col md="1"><Link to={`/activities/`}><Button className="btn btn-primary">Back</Button></Link></Col>
                                    <Col md="1"><Button>This activity has been {this.state.activity.status}.</Button></Col>
                                </div>)
                            }
                        </Row>


                    </Panel>
                </Col>
            {/*<Col md={8}>*/}
                {/*/!*<div onClick={this.onSubmit}><Button>Request</Button></div>*!/*/}
                {/*<Panel>*/}
                    {/*<row>*/}
                        {/*<Button>{this.state.activity._id}</Button>*/}
                    {/*</row>*/}
                    {/*<row>*/}
                        {/*<Button> {this.state.activity.requestTitle} </Button>*/}
                    {/*</row>*/}
                    {/*<row>*/}
                        {/*<Button> {this.state.activity.organizationName} </Button>*/}
                    {/*</row>*/}
                    {/*<row>*/}
                        {/*<Button> {this.state.activity.requestDate} </Button>*/}
                    {/*</row>*/}
                    {/*<row>*/}
                        {/*<Button> {this.state.activity.facilities} </Button>*/}
                    {/*</row>*/}
                {/*</Panel>*/}
            {/*</Col>*/}
            <Col md={2}></Col>
            </div>
        )
    }
}


ActivityDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default ActivityDetail;