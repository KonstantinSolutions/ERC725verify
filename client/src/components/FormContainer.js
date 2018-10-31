import React, { Component } from 'react'

import {
    Card,
    CardText,
    CardBody
} from 'reactstrap'

import VerifyForm from './VerifyForm'

class FormContainer extends Component {
    render() {
        return(
            <div className="form-container text-left">
                <div className="container">
                    <Card>
                        <CardBody>
                        <div className="row">
                            <div className="col-6">
                                <h1>ERC 725 Verify</h1>
                                <p>Use this utility to verify a claim placed on an ERC 725 Identity Contract.</p>
                                <p>In order to use this utility, you will need to know:</p>
                                <ul>
                                    <li>The ERC 725 Identity Contract Address</li>
                                    <li>The ERC 725 Identity Attestor Address</li>
                                    <li>The topic code</li>
                                    <li>The data associated with that code by that attestor</li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <VerifyForm />
                            </div>
                        </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        )
    }
}

export default FormContainer