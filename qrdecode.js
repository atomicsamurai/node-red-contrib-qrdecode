//var NodeWebcam = require( "node-webcam" );
var Jimp = require("jimp");
var QrCode = require('qrcode-reader');
var fs = require('fs');

module.exports = function (RED) {
    function QRDecodeNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {
            node.log(`decoding QR data from ${msg.payload}`);

            //var buffer = fs.readFileSync(__dirname + '/test.jpg');
            var buffer = fs.readFileSync(msg.payload);
            Jimp.read(buffer, function (err, image) {
                if (err) {
                    node.error(`error when reading image: ${err}`, msg);
                    // TODO handle error
                }
                var qr = new QrCode();
                qr.callback = function (err, value) {
                    if (err) {
                        node.error(`error when decoding: ${err}`, msg);
                    }
                    node.log(value.result);
                    msg.payload = value.result;
                    node.send(msg);
                };
                qr.decode(image.bitmap);
            });
        });
    }
    RED.nodes.registerType("qrdecode", QRDecodeNode);
}