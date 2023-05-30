const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const { getAddressAttestations, getAttestation } = require("./services/attestations");
const { createPNGStream } = require("./services/image");
const PORT = process.env.PORT || 9000;

const app = express();

app.get("/outift", (req, res) => {
    res.send("this is working");
});

app.get("/address/:address/attestations", async (req, res) => {
    const address = req.params.address;
    const attestations = await getAddressAttestations(address);

    res.json({
        address: address,
        attestations: attestations,
    });
});

app.get("/address/:address/image", async (req, res) => {
    const address = req.params.address;
    const attestations = await getAddressAttestations(address);
    var text = `My Passport\n${address}\n\n`;
    for (let i = 0; i < attestations.length; i++) {
        const a = attestations[i];
        text = text + `${i+1}\nschema:${a.schema}\ndata:${a.data}\n\n`;
    }

    res.set('Content-Type', 'image/png');
    const stream = createPNGStream(text);
    stream.pipe(res);
});

app.listen(PORT, () => console.log(`API Server is running on ${PORT}`));
