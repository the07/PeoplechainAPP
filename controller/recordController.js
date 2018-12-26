var Record = require('../models/record');
var Request = require('../models/request');

var crypto = require('../utils/crypto/index');

// Create a record
exports.add_record = function(req, res) {

    // Check if public key exists 

    // Check if the hash matches the generated hash - calculate hash
    
    // Check if signature is valid
    crypto.verify(dataHash, req.body.signature, req.body.publicKey);
    // Upload to IPFS and get multihash

    // Add to blockchain and get transaction id

    // Add to the Database

    // Return Success


};

// Request signature 
exports.request_signature = function(req,res) {
    res.send('Not yet implemented, Request Signature.');
};

// Sign record
exports.sign_record = function(req, res) {
    res.send('Not yet implemented, Sign Record');
};

// Decline Record
exports.decline_record = function(req, res) {
    res.send('Not yet implemented, Decline Record');
};

// Request signature from the organization 
exports.request_record_signature = function(req, res) {
    res.send('Not yet implemented, Request record signature');
};

// Request record access 
exports.request_record_access = function(req, res) {
    res.send('Not yet implemented, request record access');
}