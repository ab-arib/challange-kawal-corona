const mongoose = require ('mongoose')

const coronaReportSchema = new mongoose.Schema({
    FID: {
        type: Number
    },
    kode_provinsi: {
        type: Number
    },
    provinsi: {
        type: String
    },
    kasus_positif: {
        type: Number
    },
    kasus_sembuh: {
        type: Number
    },
    kasus_meninggal: {
        type: Number
    }
}, {
    timestamps: true
})

const CoronaReport = mongoose.model('Corona_Report', coronaReportSchema)

module.exports = CoronaReport