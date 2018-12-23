var Organization = require('../models/organization');

// Register the organization - If added by user - make him admin, if added by super admin from peer, no admin
exports.add_organization = function(req, res) {
    res.send('Not yet implemented, Add organization');
};

// Get an organization - by id
exports.get_organization(req, res) {
    res.send('Not yet implemented, Get organization');
};

// Get all organization
exports.get_all_organization(req, res) {
    res.send('Not yet implemented, Get all organization');
};

// Add or update admin
exports.manage_admin = function(req, res) {
    res.send('Not yet implemented, Manage admin');
};
