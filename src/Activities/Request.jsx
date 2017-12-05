import React, {Component} from 'react';
import 'isomorphic-fetch';
import DatePicker from 'react-bootstrap-date-picker';
import TimePicker from 'react-bootstrap-time-picker';
import {Link} from 'react-router';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron
} from 'react-bootstrap';


const PAGE_SIZE = 10;

class Request extends Component {
/*    static dataFetcher({urlBase, location}) {
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

    }*/

    constructor(props, context) {
        super(props, context);
        let value = new Date().toISOString();
        this.state = {
            organizations: [],
            facilities: [],
            selectedOrganization: {},
            selectedDate: value,
            selectedStartTime: '',
            startTime: '',
            selectedEndTime: '',
            endTime: '',
            selectedFacilities: {},
            statusOptions: ['pending', 'approved', 'denied'],
            selectedStatus: {},
        }
        this.onOrganizationSelected = this.onOrganizationSelected.bind(this);
        this.onFacilitiesSelected = this.onFacilitiesSelected.bind(this);
        this.onStatusSelected = this.onStatusSelected.bind(this);
        this.onDateSelected = this.onDateSelected.bind(this);
        this.onStartTimeSelected = this.onStartTimeSelected.bind(this);
        this.onEndTimeSelected = this.onEndTimeSelected.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        fetch('/api/organizations').then(response => {
            if (response.ok) {
                response.json().then(results => {
                    this.setState({organizations: results});
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        fetch(`/api/facilities/`).then(response => {
            if (response.ok) {
                response.json().then(results => {
                    //console.log(results);
                    this.setState({facilities: results});
                    console.log(this.state.facilities);
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

    componentDidUpdate() {
    // Access ISO String and formatted values from the DOM.
    var hiddenInputElement = document.getElementById("example-datepicker");
    console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
    console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
    }
    onSubmit(event) {
        event.preventDefault();

        console.log('Form was submitted');

        console.log('Selected status: ' + this.state.selectedStatus);

        const form = document.forms.activityRequest;

        const activityRequest = {
            requestTitle: form.requestTitle.value,
            activityDescription: form.activityDescription.value,
            activityGuest: form.activityGuest.value,
            activityAssistant: form.activityAssistant.value,
            selectedDate: this.state.selectedDate,
            startTime: this.state.selectedStartTime,
            endTime: this.state.selectedEndTime,
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
            counselorName: form.counselorName.value,
            counselorTelephone: form.counselorTelephone.value,
            counselorFaculty: form.counselorFaculty.value,
            counselorDepartment: form.counselorDepartment.value,
            counselorOfficeNumber: form.counselorOfficeNumber.value,
            counselorEmail: form.counselorEmail.value,
            requestDate: new Date(),
            building: form.facilityBuilding.value,
            organization: this.state.selectedOrganization,
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

                    this.props.router.push(`/activities/${createdRequest._id}`);
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

    onOrganizationSelected(event) {
        event.preventDefault();
        console.log('Change happened');
        console.log(event.target.value);
        const selectedOrganization = this.state.organizations.filter(function (organization) {
            console.log(organization);
            console.log(event.target.value);
            console.log(organization._id === event.target.value);
            return organization._id === event.target.value;
        });
        console.log(selectedOrganization);
        this.setState({selectedOrganization: selectedOrganization[0]});
    }

    onFacilitiesSelected(event) {
        event.preventDefault();
        console.log('Change happened');
        console.log(event.target.value);
        const selectedFacilities = this.state.facilities.filter(function (obj) {
            return obj._id == event.target.value;
        });
        console.log(selectedFacilities[0]);
        this.setState({selectedFacilities: selectedFacilities[0]});
        console.log("Selected facilities: " + this.state.selectedFacilities.managerName);
    }

    onStatusSelected(event) {
        const selectedStatus = this.state.statusOptions.filter(function (obj)  {
            return obj == event.target.value;
        });
        console.log("Selected status: " + selectedStatus[0]);

        this.setState({selectedStatus: selectedStatus[0]});
        console.log("Selected status: " + this.state.selectedStatus);
    }

    onStartTimeSelected(event) {
        console.log("Event: " + event);

        var date = new Date(null);
        console.log("Date 1: " + date);
        date.setSeconds(event); // Set event (in seconds) on the newly created date
        console.log("Date 2: " + date);


        var res = date.getTimezoneOffset()/60;

        var newDate = new Date(date.getTime() + res*3600000);
        console.log("Date 3: " + newDate);
        var result = newDate.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
        console.log("Result: " + result);
        this.setState( {selectedStartTime : result} );
        this.setState( {startTime : event} );

    }

    onEndTimeSelected(event) {
        var date = new Date(null);
        date.setSeconds(event); // specify value for SECONDS here
        var res = date.getTimezoneOffset()/60; //Gives me the hours to offset the time
        var newDate = new Date(date.getTime() + res*3600000);
        var result = newDate.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
        console.log("Result: " + result);
        this.setState( {selectedEndTime : result} );
        this.setState( {endTime : event} );
    }

    onDateSelected(event) {
        console.log("Type Of: " + typeof(event));
        var editedDate = event.substr(0,10);
        console.log("editedDate: " + editedDate);

        /*            console.log("Date Changed");
                    console.log("Event: " + event);
        /!*            console.log(typeof(event));
                    const myDate = new Date();
                    console.log(typeof(new Date (event)));
                    console.log(typeof(myDate));*!/

                    const selectedDate = new Date (event);
                    this.setState({selectedDate: selectedDate});
                    console.log("Selected Date: " + selectedDate);
                    console.log("Did you change?");
                    console.log("Activity Date: " + this.state.activityDate);*/

        this.setState({selectedDate: editedDate});
    }

    render() {
        console.log(this.state.selectedOrganization._id);
        const organizationOptions = this.state.organizations.map(organization =>
            <option value={organization._id}>{organization.name}</option>
        );

        const facilitiesOptions = this.state.facilities.map(facilities =>
            <option value={facilities._id}>{facilities.name}</option>
        );

        const statusOptions = this.state.statusOptions.map(option =>
            <option value={option}>{option}</option>
        );

        return (
            <div className="container">
                <ol className="breadcrumb">
                    <li/>
                    <li className="active">Request</li>
                </ol>

                <Col md={12}>
                        <Form horizontal onSubmit={this.onSubmit} name="activityRequest">
                            <br />

                            <Panel header="Student Information">
                            <FormGroup id="needs-validation" novalidate>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel} for="validationCustom01">Full Name</Col>
                                    <FormControl name="requesterName" id="validationCustom01"/>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Identification Number</Col>
                                    <FormControl name="studentIdentificationNumber"/>
                                </Col>

                                <Col sm={3}>
                                    <Col componentClass={ControlLabel}>Role</Col>
                                    <FormControl name="studentRole"/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={6}>
                                <Col componentClass={ControlLabel}>Address 1</Col>
                                    <FormControl name="studentAddress1" />
                                </Col>

                                <Col sm={6}>
                                    <Col componentClass={ControlLabel}>Address 2</Col>
                                    <FormControl name="studentAddress2" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={3}>
                                    <Col componentClass={ControlLabel}>City</Col>
                                    <FormControl name="studentAddressCity" />
                                </Col>

                                <Col sm={3}>
                                    <Col componentClass={ControlLabel}>State</Col>
                                    <FormControl name="studentAddressState" />
                                </Col>

                                <Col sm={3}>
                                    <Col componentClass={ControlLabel}>Country</Col>
                                    <FormControl name="studentAddressCountry" />
                                </Col>

                                <Col sm={3}>
                                    <Col componentClass={ControlLabel}>Zip Code</Col>
                                    <FormControl name="studentAddressZipCode" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Telephone</Col>
                                    <FormControl name="studentTelephone"/>
                                </Col>
                            </FormGroup>
                            </Panel>
                            <br />
                            <br />

                            <Panel header="Activity Information">
                            <FormGroup>
                                <Col sm={3}>
                                    <Col componentClass={ControlLabel}>Name</Col>
                                    <FormControl name="requestTitle"/>
                                </Col>

                                <Col sm={9}>
                                    <Col componentClass={ControlLabel}>Description</Col>
                                    <FormControl name="activityDescription"/>
                                </Col>

                            </FormGroup>

                            <FormGroup>
                                <Col sm={3}>
                                    <Col componentClass={ControlLabel}>Invited Guests</Col>
                                    <FormControl name="activityGuest"/>
                                </Col>

                                <Col sm={3}>
                                    <Col componentClass={ControlLabel}>Assistants</Col>
                                    <FormControl name="activityAssistant"/>
                                </Col>

                                <Col md={3}>
                                    <Col componentClass={ControlLabel}>Facility Name</Col>

                                    <FormControl componentClass="select" name="selectFacilities"
                                                 onChange={this.onFacilitiesSelected}

                                                 placeholder="select">
                                        <option>select</option>
                                        {facilitiesOptions}
                                    </FormControl>
                                </Col>

                                <Col md={3}>
                                    <Col componentClass={ControlLabel}>Building</Col>
                                    <FormControl name="facilityBuilding" value={this.state.selectedFacilities.building}/>
                                </Col>
                            </FormGroup>

                                <FormGroup>
                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>Date</Col>

                                        <DatePicker id="example-datepicker" name="selectedDate" onChange={this.onDateSelected} value={this.state.selectedDate}/>

                                        {/*<DatePicker id="example-datepicker" onChange={this.onDateSelected} value="2017-11-30T16:00:00.000Z"/>*/}
                                    </Col>

                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>Start Time</Col>
                                        <TimePicker name="startTime" start="7:00" end="24:00" step={30} onChange={this.onStartTimeSelected} value={this.state.startTime}/>
                                    </Col>

                                    <Col sm={4}>
                                        <Col componentClass={ControlLabel}>End Time</Col>
                                        <TimePicker name="endTime" start="7:00" end="24:00" step={30} onChange={this.onEndTimeSelected} value={this.state.endTime}/>
                                    </Col>

                                </FormGroup>
                            </Panel>
                            <br />
                            <br />

                            <Panel header="Organization Information">
                                <FormGroup>
                                    <Col md={4}>
                                        <Col componentClass={ControlLabel}>Organization</Col>

                                        <FormControl componentClass="select" name="selectOrganization"
                                                     onChange={this.onOrganizationSelected}
                                                     placeholder="select">
                                            <option>select</option>
                                            {organizationOptions}
                                        </FormControl>
                                    </Col>

                                    <Col sm={2}>
                                        <Col componentClass={ControlLabel}>Initials</Col>
                                        <FormControl name="organizationInitials" value={this.state.selectedOrganization.initials} />
                                    </Col>
                                </FormGroup>
                            </Panel>
                            <br />
                            <br />

                            <Panel header="Counselor Information">
                            <FormGroup>
                                <Col md={4}>
                                    <Col componentClass={ControlLabel}>Name</Col>
                                    <FormControl name="counselorName" value={this.state.selectedOrganization.counselorName} />
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Telephone</Col>
                                    <FormControl name="counselorTelephone" value={this.state.selectedOrganization.counselorTelephone}/>
                                </Col>

                                <Col sm={4}>
                                    <Col componentClass={ControlLabel}>Email</Col>
                                    <FormControl name="counselorEmail" value={this.state.selectedOrganization.counselorEmail}/>
                                </Col>
                                </FormGroup>

                                <FormGroup>
                                <Col sm={3}>
                                    <Col componentClass={ControlLabel}>Faculty</Col>
                                    <FormControl name="counselorFaculty" value={this.state.selectedOrganization.counselorFaculty}/>
                                </Col>

                                <Col sm={3}>
                                    <Col componentClass={ControlLabel}>Department</Col>
                                    <FormControl name="counselorDepartment" value={this.state.selectedOrganization.counselorDepartment}/>
                                </Col>

                                <Col sm={2}>
                                    <Col componentClass={ControlLabel}>Office Number</Col>
                                    <FormControl name="counselorOfficeNumber" value={this.state.selectedOrganization.counselorOfficeNumber}/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col md={4}>
                                    <Col componentClass={ControlLabel}>Status</Col>

                                    <FormControl componentClass="select" name="selectStatus"
                                                 onChange={this.onStatusSelected}

                                                 placeholder="select">
                                        <option>select</option>
                                        {statusOptions}
                                    </FormControl>
                                </Col>
                            </FormGroup>
                                </Panel>

                            <ButtonToolbar>
                                <Col md={6}>
                                    <Button bsStyle="primary" type="submit">Submit</Button>
                                </Col>
                            </ButtonToolbar>

                        </Form>
                </Col>
                <Col md={2}></Col>
            </div>
        )
    }
}

Request.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Request;