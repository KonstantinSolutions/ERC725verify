import React, { Component } from 'react'

import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormText,
    Alert
} from 'reactstrap'

import {
    isValidEthAddress,
    validateClaim
} from '../helpers/eth'

class VerifyForm extends Component {

    state = {
        loading: false,
        idAddressValid: null,
        idAddressError: false,
        attestorAddressValid: null,
        claim: {
            checked : false,
            isValid : false
        }
    }

    handleSubmit = async(e) => {
        e.preventDefault();
        e.persist();

        const {
            idAddress,
            attestorAddress,
            claimTopic,
            claimData,
            claimSignature
        } = e.target;

        await this.setState({ loading: true });

        const isValid = await validateClaim(
            this.props.web3,
            idAddress.value,
            attestorAddress.value,
            claimTopic.value,
            claimData.value,
            claimSignature.value
        )

        console.log("isValid = ", isValid);

        await this.setState({
            loading: false,
            claim: {
                checked : true,
                isValid : isValid
            }
        });
    }

    resetClaim = async(e) => {
        await this.setState({claim: {checked: false, isValid: false}})
    }

    handleIdAddressChange = async(e) => {
        e.preventDefault();
        e.persist();

        this.resetClaim();

        const field = e.target;
        let validVar = field.name + "Valid"
        let errorVar = field.name + "Error"

        // TODO: Validate that field is a valid ethereum address
        if (!isValidEthAddress(this.props.web3, field.value)) {
            await this.setState({
                [validVar] : false,
                [errorVar] : "Invalid Ethereum Address"

            })
            return;
        }

        await this.setState({loading: true});
        // TODO: Validate that field refers to valid ERC 725 contract


        await this.setState({
            [field.name] : field.value,
            [validVar] : true,
            [errorVar] : false
        })

        await this.setState({loading: false});
    }

    handleChange = async(e) => {
        this.resetClaim();
    }

    render() {
        const {
            handleIdAddressChange,
            handleChange
        } = this;

        const {
            loading,
            idAddressValid,
            idAddressError,
            attestorAddressValid,
            attestorAddressError,
            claim
        } = this.state;

        const buttonText = {
            submit: "Check Claim",
            loading: "Checking Claim..."
        }


        return(
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="identityAddress">ERC 725 Identity Address</Label>
                    <Input
                        name="idAddress"
                        id="idAddress"
                        placeholder="0x"
                        valid={idAddressValid}
                        invalid={!idAddressValid}
                        onChange={handleIdAddressChange}
                        required
                        readOnly={loading} />
                    {
                        idAddressError ?
                        <FormText color="danger">{idAddressError}</FormText> : ''
                    }
                </FormGroup>

                <FormGroup>
                    <Label for="attestorAddress">Attestor Address</Label>
                    <Input
                        name="attestorAddress"
                        id="attestorAddress"
                        placeholder="0x"
                        valid={attestorAddressValid}
                        invalid={!attestorAddressValid}
                        onChange={handleIdAddressChange}
                        required
                        readOnly={loading} />
                    {
                        attestorAddressError ?
                        <FormText color="danger">{attestorAddressError}</FormText> : ''
                    }
                </FormGroup>

                <FormGroup>
                    <Label for="claimTopic">Claim Topic</Label>
                    <Input
                        name="claimTopic"
                        id="claimTopic"
                        placeholder="ex. 10"
                        onChange={handleChange}
                        required
                        readOnly={loading} />
                </FormGroup>

                <FormGroup>
                    <Label for="claimData">Claim Data</Label>
                    <Input
                        name="claimData"
                        id="claimData"
                        onChange={handleChange}
                        placeholder=""
                        readOnly={loading} />
                </FormGroup>

                <FormGroup>
                    <Label for="claimSignature">Claim Signature</Label>
                    <Input
                        name="claimSignature"
                        id="claimSignature"
                        onChange={handleChange}
                        placeholder="0x"
                        readOnly={loading} />
                </FormGroup>

                <Button className="mb-2" disabled={loading}>{loading ? buttonText.loading : buttonText.submit}</Button>

                {
                    claim.checked ?
                    <div className="alert-container">
                        {claim.isValid ?
                            <Alert color="success">This claim is valid!</Alert> :
                            <Alert color="danger">This claim is not valid.</Alert>
                        }
                    </div> : ''
                }
            </Form>
        )
    }
}

export default VerifyForm