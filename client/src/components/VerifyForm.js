import React, { Component } from 'react'

import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'

class VerifyForm extends Component {

    state = {
        loading: false
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            loading: true
        });

        setTimeout(()=> {
            this.setState({
                loading: false
            })
        }, 1000)
    }

    render() {
        const {loading} = this.state;
        const buttonText = {
            submit: "Check Claim",
            loading: "Checking Claim..."
        }


        return(
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="identityAddress">ERC 725 Identity Address</Label>
                    <Input
                        name="identityAddress"
                        id="identityAddress"
                        placeholder="0x"
                        readOnly={loading} />
                </FormGroup>

                <FormGroup>
                    <Label for="attestorAddress">Attestor Address</Label>
                    <Input
                        name="attestorAddress"
                        id="attestorAddress"
                        placeholder="0x"
                        readOnly={loading} />
                </FormGroup>

                <FormGroup>
                    <Label for="claimTopic">Claim Topic</Label>
                    <Input
                        name="claimTopic"
                        id="claimTopic"
                        placeholder="ex. 10"
                        readOnly={loading} />
                </FormGroup>

                <FormGroup>
                    <Label for="claimData">Claim Data</Label>
                    <Input
                        name="claimData"
                        id="claimData"
                        placeholder=""
                        readOnly={loading} />
                </FormGroup>

                <Button disabled={loading}>{loading ? buttonText.loading : buttonText.submit}</Button>
            </Form>
        )
    }
}

export default VerifyForm