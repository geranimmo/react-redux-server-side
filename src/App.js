import React from 'react';
import { connect } from 'react-redux';
import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom';
import { testAction } from './actions';
import Routes from './Routes';
import Navigation from './components/common/Navigation';
import NotFound from './components/NotFound';

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
                <Navigation/>
                <Switch>
                    { Routes.map(({ path, component: C, exact, ...rest }) => (
                        <Route
                            key={path}
                            path={path}
                            exact={exact}
                            render={(props) => (
                                <C {...props} {...rest}/>
                            )}
                        />
                    )) }
                    <Route render={(props) => <NotFound {...props}/>} />
                </Switch>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return state;
};

export default withRouter(connect(mapStateToProps, { testAction })(App));