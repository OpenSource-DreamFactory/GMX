const fs = require('fs');

const networkInfo = {
    network: '',
    gasUsed: 0,
}

const setNetwork = (_network) => {
    networkInfo.network = _network
    networkInfo.gasUsed = 0
}

const addGasUsed = (gas) => {
    networkInfo.gasUsed += parseInt(gas)
}

const getGasUsed = () => {
    return networkInfo.gasUsed
}

const getNetwork = () => {
    return networkInfo.network
}

const getDeployInfo = () => {
    try {
    return JSON.parse(fs.readFileSync(`scripts/deploylog.json`));
    } catch (err) {
        // console.log(err)
        return []
    }
}

const getDeployFilteredInfo = (name) => {
    try {
    const tr = JSON.parse(fs.readFileSync(`scripts/deploy-core.json`));
    return tr.find(t => t.name === name)
    } catch (err) {
        console.log(err)
        return []
    }
}

const syncDeployInfo = (_name, _info) => {
    let _total = getDeployInfo()
    _total = [..._total.filter(t => t.name !== _name), _info];
    fs.writeFileSync(`deploylog.json`, JSON.stringify(_total));
    return _total;
}

module.exports = { getNetwork, setNetwork, getDeployFilteredInfo, syncDeployInfo, addGasUsed, getGasUsed }
