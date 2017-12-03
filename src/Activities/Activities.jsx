import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';
import {
    Button, Glyphicon, Table, Panel, Pagination, Jumbotron, Col, Row, Checkbox, Breadcrumb,
    BreadcrumbItem
} from 'react-bootstrap';
import Select from 'react-select';

const PAGE_SIZE = 10;

class Activities extends Component {
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
            activities: []
        }
    }

    componentDidMount() {

        fetch('/api/activities').then(response => {
            if (response.ok) {
                console.log('PUNETAA! :D');
                response.json().then(results => {
                    //console.log(results);
                    this.setState({activities: results});
                    console.log('Estos son los fucking resultados puneta');
                    console.log(this.state.activities);
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

        fetch('/api/pending').then(response => {
            if (response.ok) {
                console.log('/api/pending! :D');
                response.json().then(results => {
                    console.log('Total pending activities: ' + results);

                    //console.log(this.state.activities);
                    //this.props.router.push(`/activities/${createdRequest._id}`);
                });
            } else {
                console.log('Unable to fetch pending activities')
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            this.props.showError(`Error in sending data to server: ${err.message}`);
        });
    }

    render() {
        const activities = this.state.activities.map(activity =>

            <Col md={12}>

            <Panel  header={activity.requestTitle}>
                <td><Link to={`/activities/${activity._id}`}>{activity.requestTitle}</Link></td>
                <p>Description: {activity.activityDescription}</p>
                <p>Organization: {activity.organization.name}</p>
                <p>Facility: {activity.facilities.name}</p>
                <p>Status: {activity.status}</p>
            </Panel>

            </Col>
        );

        return (
            <div className="container">
                {/*<Jumbotron><h3>Activities</h3></Jumbotron>*/}
                <ol className="breadcrumb">
                    <li/>
                    <li className="active">Activities</li>
                </ol>
                    <Col md={3}>

                        {/*<Breadcrumb>*/}
                            {/*<Breadcrumb.Item><a href="/home">Home</a></Breadcrumb.Item>*/}
                            {/*<Breadcrumb.Item title="Activities" href="/activities"></Breadcrumb.Item>*/}

                        {/*</Breadcrumb>*/}
                        <Panel header='Search Activities'>
                            {/*<td><Link to={`/activities/1`}>Hello</Link></td>*/}
                            <Select.Async
                                instanceId="search" placeholder="Search ..." autoload={false} cache={false}
                            />
                            <Checkbox><p>Organization Acronym</p></Checkbox>
                            <Checkbox><p>Request Title</p></Checkbox>
                            <Checkbox><p>Request Description</p></Checkbox>
                        </Panel>
                    </Col>
                <Col md={9}>
                    <div>{activities}</div>
                </Col>

            </div>
        )
    }
}

Activities.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Activities;