const { createCanvas, registerFont } = require('canvas');

const canvasWidth = 800;
const canvasHeight = 600;

const fontSize = 18;
const fontFamily = 'Arial';
const textColor = 'red';

function createPNGStream(text) {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = textColor;

    const x = 20;
    const y = 20;

    ctx.fillText(text, x, y);
    const stream = canvas.createPNGStream();
    return stream;
}

module.exports = {
    createPNGStream,
};