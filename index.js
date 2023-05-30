const fs = require("fs/promises");
const express = require("express");
const _ = require("lodash");
const dotenv = require("dotenv");

const { getAddressAttestations, getAttestation } = require("./services/attestations");
const { createPNGStream } = require("./services/image");

const app = express();
dotenv.config();

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

app.get("/address/:address/metadata", async (req, res) => {
    const address = req.params.address;

    res.json({
        name: "Skylight",
        description: "A skylight is an architectural feature that consists of a window or opening in a roof or ceiling, allowing natural light to enter a building or enclosed space from above.",
        image: `https://live-nft.herokuapp.com/address/${address}/image`
    });
});

app.listen(process.env.PORT || 3000, () => console.log("API Server is running"));
