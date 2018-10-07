import React from 'react';
import { withRouter } from 'react-router-dom';

class HomeComponent extends React.Component {
    render() {
        return <h1>Home Page is Open</h1>;
    }
}

export default withRouter(HomeComponent);