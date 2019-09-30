//var NodeWebcam = require( "node-webcam" );
var Jimp = require("jimp");
var QrCode = require('qrcode-reader');
var fs = require('fs');

module.exports = function (RED) {
    function QRDecodeNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {
            //console.log(`decoding QR data from ${msg.payload}`);
            var buf = msg.payload;
            //var buffer = fs.readFileSync(__dirname + '/test.jpg');
            //var buffer = fs.readFileSync(msg.payload);
            if (buf instanceof Buffer) {
                Jimp.read(buf, function (err, image) {
                    if (err) {
                        node.warn(`error when reading image: ${err}`, {});
                        msg.payload = {status : 1, message: `error when reading image: ${err}`};
                        node.send(msg);
                        // TODO handle error
                    } else {
                        var qr = new QrCode();
                        qr.callback = function (err, value) {
                            if (err) {
                                node.warn(`error when decoding: ${err}`, {});
                                msg.payload = {status : 1, message: `error when decoding image: ${err}`};
                                node.send(msg);
                            } else {
                                node.debug(value.result);
                                msg.payload = {status : 0, message: `success`, value: `${value.result}`};
                                //msg.payload = value.result;
                                node.send(msg);
                            }
                        }
                        qr.decode(image.bitmap);
                    }
                });
            } else {
                node.warn("invalid input", {});
                msg.payload = {status : 1, message: `invalid input`};
                node.send(msg);
            }
        });
    }
    RED.nodes.registerType("qrdecode", QRDecodeNode);
}