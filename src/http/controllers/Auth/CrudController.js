const { User } = require('../../models');
const path = require('path');

const findDonations = async (req, res) => {
    
    const filePath = path.join(__dirname, '../../../views/fomulario/index.html');

    res.sendFile(filePath);
};

const donations = async (req, res) => {
    const filePath = path.join(__dirname, '../../../views/fomulario/list.html');
    res.sendFile(filePath);
};

const products = async (req, res) => {
    const filePath = path.join(__dirname, '../../../views/fomulario/resources.html');
    res.sendFile(filePath);
};


const distribuition = async (req, res) => {
    const filePath = path.join(__dirname, '../../../views/fomulario/distribution.html');
    res.sendFile(filePath);
};

const donationResource = async (req, res) => {
    const filePath = path.join(__dirname, '../../../views/fomulario/donations.html');
    res.sendFile(filePath);
};

const dashboardResource = async (req, res) => {
    const filePath = path.join(__dirname, '../../../views/fomulario/dashboard.html');
    res.sendFile(filePath);
};

module.exports = {
    findDonations,
    donations,
    products,
    distribuition,
    donationResource,
    dashboardResource
};