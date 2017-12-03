import React, {Component} from 'react';
import 'isomorphic-fetch';
import {Link} from 'react-router';
import {Button, Glyphicon, Table, Panel, Pagination, Col, Jumbotron} from 'react-bootstrap';

const PAGE_SIZE = 10;

class Facilities extends Component {
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
            facilities: []
        }
    }

    componentDidMount() {
        console.log('this.props.params.id: ' + this.props.params.id);
        let id = this.props.params.id;
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
        console.log(this.state.facilities);
        const facilities = this.state.facilities.map(facilities =>

            <Col md={12}>

                <Panel collapsible header={facilities.name}>
                    <p><Link to={`/admin/facilities/${facilities._id}`}>{facilities.name}</Link></p>
                    <p>Building Name: {facilities.building}</p>
                    <p>Creation Date: {facilities.creationDate}</p>
                    <p>Manager Name: {facilities.managerName}</p>
                    <p>Manager Email: {facilities.managerEmail}</p>
                    <Link to={`/admin/facilities/${facilities._id}`}><Button className="btn btn-primary">Details</Button></Link>
                </Panel>

            </Col>
        );
        return (
            <div className="container">
                {/*<Jumbotron><h3>Admin Panel</h3></Jumbotron>*/}
                <ol className="breadcrumb">
                    <li/>
                    <li><Link to={`/admin/`}>Admin Panel</Link></li>
                    <li className="active">Facilities</li>
                </ol>
                <Col md={3}>
                    <Panel collapse header='Manage Facilities'>
                        <ul>
                            <li><Link to={`/admin/facilities/create/`}>Create New Facilities</Link></li>
                            <li>Edit Existing Facilities</li>
                        </ul>
                    </Panel>
                </Col>
                <Col md={6}>
                    <Panel collapse header='Facilities'>

                    </Panel>
                    {facilities}

                </Col>
                <Col md={3}></Col>


            </div>
        )
    }
}

Facilities.contextTypes = {
    initialState: React.PropTypes.object,
};

export default Facilities;