import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, NavLink, withRouter } from 'react-router-dom';
import { testAction } from './actions';
import Routes from './Routes';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TestData: 'No data received!'
        }
    }

    componentWillMount() {
        this.props.testAction();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource(state) {
        this.setState({
            TestData: state.TestDataReducer
        });
    }
    
    render() {
        return (
            <div>
                <h1>Redux is running: {this.state.TestData}</h1>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/detail">Detail</NavLink>
                    </li>
                </ul>
                <Switch>
                    {
                        Routes.map(routes => {return <Route {...routes}/>})
                    }
                </Switch>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return state;
};

export default withRouter(connect(mapStateToProps, { testAction })(App));