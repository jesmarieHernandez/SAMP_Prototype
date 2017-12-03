import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';

import {
    FormGroup, FormControl, ControlLabel, ButtonToolbar, Button,
    Panel, Form, Col, Alert, Radio, Well, MenuItem, DropdownButton, Jumbotron, Row
} from 'react-bootstrap';


const PAGE_SIZE = 10;

class OrganizationDetail extends Component {
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
            organization: {
                _id: 0,
                name: '',
                initials: '',
                creationDate: '',
                counselorName: '',
                counselorEmail: '',
                counselorTelephone: '',
                counselorFaculty: '',
                counselorDepartment: '',
                counselorOfficeNumber: ''
            },
            organizationActivities: []
        }
    }

    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.params.id);
        let id = this.props.params.id;
        fetch(`/api/organizations/${id}`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({organization: data});
                console.log(this.state.organization._id);
            }).catch(err => {
                console.log(err)
                //this.props.showError(`Error in sending data to server: ${err.message}`);
            });
        });

        fetch(`/api/organizations/${id}/activities`).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({organizationActivities: data});
            })
        })


    }

    onSubmit(event) {
        event.preventDefault();
    }


    render() {
        const organizationActivities = this.state.organizationActivities.map(activity =>
            <Col md={12}>
                <Panel  header={activity.requestTitle}>
                    <td><Link to={`/activities/${activity._id}`}>{activity.requestTitle}</Link></td>
                    <p>Organization Acronym: {activity.organization.name}</p>
                    <p>Request Title: {activity.requestDate}</p>
                    <p>Request Description: {activity.facilities.name}</p>
                </Panel>

            </Col>
        );

        return (
            <div className="container">
                <ol className="breadcrumb">
                    <li/>
                    <li><Link to={`/admin/`}>Admin Panel</Link></li>
                    <li><Link to={`/admin/organizations`}>Organizations</Link></li>
                    <li className="active">Organization Details</li>
                </ol>

{/*                <Col md={12}>
                    <Panel header='Search Activities'>
                        <p>Organization Name: {this.state.organization.name}</p>
                        <p>Organization Initials: {this.state.organization.initials}</p>
                        <p>Creation Date: {this.state.organization.creationDate}</p>
                        <p>Counselor Name: {this.state.organization.counselorName}</p>
                        <p>Counselor Email: {this.state.organization.counselorEmail}</p>
                        <p>Counselor Telephone: {this.state.organization.counselorTelephone}</p>
                        <p>Counselor Faculty: {this.state.organization.counselorFaculty}</p>
                        <p>Counselor Department: {this.state.organization.counselorDepartment}</p>
                        <p>Counselor Office Number: {this.state.organization.counselorOfficeNumber}</p>

                        <Row>
                            <Col md="1"><Link to={`/activities/`}><Button className="btn btn-primary">Back</Button></Link></Col>
                            <Col md="1"><Button className="btn-success">Contact</Button></Col>
                            <Col md="1"><Button className="btn-warning">Edit</Button></Col>
                        </Row>
                    </Panel>
                </Col>*/}

                <Col md={12}>
                    <Panel  header={this.state.organization.name}>
                        <p>Organization Name: {this.state.organization.name}</p>
                        <p>Organization Initials: {this.state.organization.initials}</p>
                        <p>Creation Date: {this.state.organization.creationDate}</p>
                        <p>Counselor Name: {this.state.organization.counselorName}</p>
                        <p>Counselor Email: {this.state.organization.counselorEmail}</p>
                        <p>Counselor Telephone: {this.state.organization.counselorTelephone}</p>
                        <p>Counselor Faculty: {this.state.organization.counselorFaculty}</p>
                        <p>Counselor Department: {this.state.organization.counselorDepartment}</p>
                        <p>Counselor Office Number: {this.state.organization.counselorOfficeNumber}</p>
                        <Row>
                            <Col md="1"><Link to={`/activities/`}><Button className="btn btn-primary">Back</Button></Link></Col>
                            <Col md="1"><Button className="btn-success">Contact</Button></Col>
                            <Col md="1"><Button className="btn-warning">Edit</Button></Col>
                        </Row>
                    </Panel>
                </Col>

                <Col md={12}>
                <Panel header="Recent Activities">
                {organizationActivities}
                    </Panel>
                </Col>
            </div>
        )
    }
}


OrganizationDetail.contextTypes = {
    initialState: React.PropTypes.object,
};

export default OrganizationDetail;