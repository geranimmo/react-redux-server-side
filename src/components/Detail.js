import React from 'react';
import { withRouter } from 'react-router-dom';

class DetailComponent extends React.Component {
    render() {
        return <h1>Detail Page is Open</h1>;
    }
}

export default withRouter(DetailComponent);