import React, { Component } from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';
import {Button, Glyphicon, Table, Panel, Pagination, Jumbotron, Col} from 'react-bootstrap';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

const PAGE_SIZE = 10;

class Stats extends Component {
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
            pending: 0,
            cancelled: 0,
            celebrated: 0
        }
    }

    componentDidMount() {
        fetch('/api/pending').then(response => {
            if (response.ok) {
                response.json().then(count => {
                    this.setState({pending: count});
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        fetch('/api/cancelled').then(response => {
            if (response.ok) {
                response.json().then(count => {
                    this.setState({cancelled: count});
                });
            } else {
                // response.json().then(error => {
                //     this.props.showError(`Failed to add issue: ${error.message}`);
                // });
            }
        }).catch(err => {
            this.props.showError(`Error in sending data to server: ${err.message}`);
        });

        fetch('/api/celebrated').then(response => {
            if (response.ok) {
                response.json().then(count => {
                    this.setState({celebrated: count});
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

    render() {

        let data = [
            {name: 'Activities', pending: this.state.pending, celebrated: this.state.celebrated, cancelled: this.state.cancelled},
        ];
        return (
            <div className="container">
                {/*<Jumbotron><h3>Stats</h3></Jumbotron>*/}
                <ol className="breadcrumb">
                    <li/>
                    <li className="active">Stats</li>
                </ol>
                <Col md={3}>
                    <Panel collapse header='Filter'>
                        {/*<td><Link to={`/activities/1`}>Hello</Link></td>*/}

                        <p>Activity stats for the last month</p>

                    </Panel>
                </Col>
                <Col md={9}>
                    <Col md={12}>
                        <Panel  header="Monthly Activities">
                            <BarChart width={600} height={300} data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pending" fill="#8884d8" />
                                <Bar dataKey="approved" fill="#82ca9d" />
                                <Bar dataKey="denied"  fill="#823333" />

                            </BarChart>
                        </Panel>
                    </Col>
                    <div></div>
                </Col>

            </div>        )
    }
}




Stats.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Stats;