import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/reward/492/ice-cream-cake-2-kg">Ice Cream Cake 2 KG</NavLink>
                    </li>
                    <li>
                        <NavLink to="/reward/429/e-gift-alfamart-10000">E Gift Alfamart 10000</NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default withRouter(Navigation);