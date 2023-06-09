const { EAS, SchemaRegistry } = require("@ethereum-attestation-service/eas-sdk");
const { ethers } = require("ethers");

const easContractAddress = "0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A"; // Base Goerli v0.27
// Gets a default provider (in production use something else like infura/alchemy)
const eas = new EAS(easContractAddress);
const baseProvider = new ethers.providers.JsonRpcProvider(
    "https://crimson-withered-pine.base-goerli.discover.quiknode.pro/428835148f43c77dc2ba641b619dc9eb05ba6d61/"
);
eas.connect(baseProvider);

const schemaRegistryContractAddress = "0x720c2bA66D19A725143FBf5fDC5b4ADA2742682E"; // Sepolia 0.26
const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
schemaRegistry.connect(baseProvider);

const map = {
    "0x83C2bbef5a09C4B46E049917a41E05fAf74b6275": [
        "0x9918f23d4d26e59b69ed88c4c4ad78faa62426a4ce4d6e6be93d895a001f338e"
    ],
};

// TODO: figure out if there is an indexer
async function getAddressAttestations(address) {
    const attestationUIDs = map[address];

    var attestations = [];
    for (let index = 0; index < attestationUIDs.length; index++) {
        const uid = attestationUIDs[index];
        const attestationRecord = await eas.getAttestation(uid);
        const schemaUID = attestationRecord.schema;
        const data = attestationRecord.data;
        if (attestationRecord.recipient !== address) {
            console.log(`attestation recpient ${attestationRecord.recipient} is not for address ${address}`);
            continue;
        }

        const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });

        const attestation = {
            schema: schemaRecord.schema,
            data: data,
        }
        attestations.push(attestation);
    }

    return attestations;
}

module.exports = {
    getAddressAttestations,
};
