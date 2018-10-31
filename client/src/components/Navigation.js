import React, { Component } from 'react'

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import NetworkBadge from './NetworkBadge'

class Navigation extends Component {
    render() {
        return (
            <Navbar color="list" light expand="md">
                <NavbarBrand href="/">ERC725 Verify</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                    <NetworkBadge network={this.props.network} />
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default Navigation;