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
    const attestations = getAddressAttestations(address);

    res.json({
        address: address,
        attestations: attestations,
    });
});

app.listen(9000, () => console.log("API Server is running"));
