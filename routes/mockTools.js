const express = require('express');
const router = express.Router();

module.exports = function () {
    router.get('/', (req, res, next) => {
        res.render('mockTools', { home_title: 'Mock Request' })
    })
    return router
}