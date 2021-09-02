const express = require('express');
const CoronaReport = require('../models/corona-report');
const router = new express.Router();

router.get('/corona/:kode_provinsi', async (req, res) => {
    try {
        const kode_provinsi = req.params.kode_provinsi
        const coronaReport = await CoronaReport.findOne({ kode_provinsi })
        if (!coronaReport) {
            return res.status(404).send()
        }
        res.send(coronaReport)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router