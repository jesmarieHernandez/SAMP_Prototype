import React, { Component } from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';
import {Panel, Col,} from 'react-bootstrap';

class Home extends Component {
    static dataFetcher({urlBase, location}) {

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
                response.json().then(results => {
                    this.setState({activities: results});
                });
            } else {
                response.json().then(error => {
                    console.log('Something went wrong: ' + error);
                })
            }
        }).catch(err => {
            this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        fetch('http://localhost:8080/user/5').then(response => {
            if (response.ok) {
                response.json().then(results => {
                    console.log(results)
                });
            } else {
                response.json().then(error => {
                    console.log('Something went wrong: ' + error);
                })
            }
        }).catch(err => {
            console.log('error: ' + err);
        });


    }

    render() {

        const activities = this.state.activities.map(activity =>

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
                    <li className="active">Home</li>
                </ol>
                <Col md={3}>

                </Col>
                <Col md={6}>
                    <Panel  header="Latest Activities">
                    </Panel>
                    <div>{activities}</div>
                </Col>
                <Col md={3}>

                </Col>

            </div>
        )
    }
}

Home.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Home;