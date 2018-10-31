import React, { Component } from 'react';
import { Badge } from 'reactstrap';

import {default as networks} from '../constants/ethereum-networks.json';

class NetworkBadge extends Component {

    displayNetwork = () => {
        let net = networks.filter((n) => {
            return n.id === this.props.network
        })

        return net.length ? net[0].value : 'Custom:' + this.props.network
    }

    render() {
        return (
            <Badge>{this.displayNetwork()}</Badge>
        )
    }
}

export default NetworkBadge;