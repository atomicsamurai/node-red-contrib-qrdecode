# node-red-contrib-qrdecode
A <a href="http://nodered.org" target="_new">Node-RED</a> node to decode a QR code from an image file.

## Install

Run the following command in the root directory of your Node-RED install or home directory (usually ~/.node-red) and will also install needed libraries.

        npm install node-red-contrib-qrdecode

The node takes the full (absolute) path of the image file as an input and then sets the message payload with the decoded content of the QR code contained in the image.

If it does not detect or can not decode the QR code, it returns an error message in the message payload.

This node basically wraps the excellent <a href="https://www.npmjs.com/package/qrcode-reader" target="_new">qrcode-reader</a> node module for decoding the QR code.

### Runtime information
This node was tested to Node.js v8.10.0 LTS and NPM 5.6.0 on Node-Red v0.18.4

## Usage

Typical use of this node will be with <a href="https://www.npmjs.com/package/node-red-contrib-usbcamera" target="_new">node-red-contrib-usbcamera</a>.

![Example Flow](https://raw.githubusercontent.com/sandman0/node-red-contrib-qrdecode/master/docs/images/sample_flow.png)
