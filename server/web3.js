const Web3 = require('web3')
const Provider = require('@truffle/hdwallet-provider')
const contract = require('./contract/DID.json')
require('dotenv').config();

let instance
class Instance {
    constructor(URL){
        if(instance) return instance
        const privateKey = process.env.CONTRACT_DEPLOYER_PK
        const provider = new Provider([privateKey], URL)
        this.web3 = new Web3(provider)
        instance = this;
    }
}

let deploy;
class Deploy {
    constructor(abi, ca, client, networkId){
        this.contract = new client.web3.eth.Contract(abi,ca);
        this.client = client;
        this.ca = ca;
        this.networkId = networkId;
        deploy = this;
    }   
}

const getDeployed = async () => {
    const URL = process.env.NETWORK_URL
    const client = new Instance(URL)

    const networkId = await client.web3.eth.net.getId();
    const ca = contract.networks[networkId].address
    const abi = contract.abi

    const deployed = new Deploy(abi,ca,client,networkId)

    return deployed
}

module.exports = getDeployed;