import {default as idAbi} from '../constants/erc725abi.json'

import {
    fromRpcSig,
    ecrecover,
    toBuffer,
    bufferToHex,
    pubToAddress
  } from 'ethereumjs-util'

export const isValidEthAddress = (web3, address) => {
    return web3.utils.isAddress(address);
}

export const isValidIdAddress = (web3, address) => {
    return new Promise((resolve, reject) => {

        // TODO: Check if address refers to an ERC725 Interface

        return true;

    })
}

export const validateClaim = async(web3, identityAddress, attestorAddress, topic, data, signature) => {
    try {
        // Get the Attestor Contract Instance
        const attestorIdentity = await new web3.eth.Contract(idAbi, attestorAddress);

        const msg = web3.utils.soliditySha3(identityAddress, topic, data)
        const prefixedMsg = web3.eth.accounts.hashMessage(msg)
        const dataBuf = toBuffer(prefixedMsg)
        const sig = fromRpcSig(signature)
        const recovered = ecrecover(dataBuf, sig.v, sig.r, sig.s)
        const recoveredBuf = pubToAddress(recovered)
        const recoveredHex = bufferToHex(recoveredBuf)
        const hashedRecovered = web3.utils.soliditySha3(recoveredHex)
        return await attestorIdentity.methods.keyHasPurpose(hashedRecovered, 3).call()
      } catch(e) {
        // validation should simply fail if there is an error
        console.error('Error during attestation validation:', e)
        return false
      }
}