import React from 'react';
import { Route, IndexRedirect, withRouter } from 'react-router';

import App from './App.jsx';
import Home from '../Home/Home.jsx';
import Activities from '../Activities/Activities.jsx';
import Stats from '../Stats/Stats.jsx';
import Admin from '../Administration/Admin.jsx';
import Request from '../Activities/Request.jsx';
import ActivityDetail from "../Activities/ActivityDetail.jsx";
import Organizations from '../Administration/Organizations/Organizations.jsx';
import CreateOrganization from '../Administration/Organizations/NewOrganization.jsx';
import Facilities from '../Administration/Facilities/Facilities.jsx';
import CreateFacilities from '../Administration/Facilities/NewFacilities.jsx';
import Users from '../Administration/Users/Users.jsx';
import CreateUser from "../Administration/Users/NewUser.jsx";
import FacilitiesDetail from "../Administration/Facilities/FacilitiesDetail.jsx";
import OrganizationDetail from "../Administration/Organizations/OrganizationDetail.jsx";
import UserDetail from "../Administration/Users/UserDetail.jsx";

const NoMatch = () => <p>Page Not Found</p>;

export default(
    <Route path="/" component={App}>
        <IndexRedirect to="/home" />
        <Route path="home" component={withRouter(Home)} />
        <Route path="request" component={withRouter(Request)} />
        <Route path="activities" component={withRouter(Activities)} />
        <Route path="activities/:id" component={withRouter(ActivityDetail)} />

        <Route path="stats" component={withRouter(Stats)} />
        <Route path="admin" component={withRouter(Admin)} />

        <Route path="admin/organizations" component={withRouter(Organizations)} />
        <Route path="admin/organizations/create" component={withRouter(CreateOrganization)} />
        <Route path="admin/organizations/:id" component={withRouter(OrganizationDetail)} />


        <Route path="admin/facilities" component={withRouter(Facilities)} />
        <Route path="admin/facilities/create/" component={withRouter(CreateFacilities)} />
        <Route path="admin/facilities/:id" component={withRouter(FacilitiesDetail)} />


        <Route path="admin/users" component={withRouter(Users)} />
        <Route path="admin/users/:id" component={withRouter(UserDetail)} />

        <Route path="admin/users/create" component={withRouter(CreateUser)} />

        {/*<Route path="*" component={NoMatch} />*/}
        <Route path="*" component={withRouter(Home)} />

    </Route>
);