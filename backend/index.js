const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const { getAddressAttestations, getAttestation } = require("./services/attestations");

const app = express();

app.get("/outift", (req, res) => {
    res.send("this is working");
});

app.get("/address/:address/attestations", async (req, res) => {
    const address = req.params.address;
    const attestationIDs = getAddressAttestations(address);

    var attestations = [];
    for (let index = 0; index < attestationIDs.length; index++) {
        const attestation = await getAttestation(attestationIDs[index]);
        attestations.push(attestation);
    }

    res.json({
        address: address,
        attestations: attestations,
    });
});

app.listen(9000, () => console.log("API Server is running"));