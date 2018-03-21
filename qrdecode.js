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
            console.log(`here1`);
            var buf = msg.payload;
            //var buffer = fs.readFileSync(__dirname + '/test.jpg');
            //var buffer = fs.readFileSync(msg.payload);
            if (buf instanceof Buffer) {
                Jimp.read(buf, function (err, image) {
                    if (err) {
                        node.error(`error when reading image: ${err}`, {});
                        // TODO handle error
                    } else {
                        var qr = new QrCode();
                        qr.callback = function (err, value) {
                            if (err) {
                                node.error(`error when decoding: ${err}`, {});
                                return;
                            } else {
                                console.log(value.result);
                                msg.payload = value.result;
                                node.send(msg);
                            }
                        }
                        qr.decode(image.bitmap);
                    }
                });
            }
        });
    }
    RED.nodes.registerType("qrdecode", QRDecodeNode);
}