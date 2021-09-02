const cron = require('node-cron');
const CoronaReport = require('../models/corona-report');
const fetchCoronaData = require('../fetch/fetch-request');

const initData = async (error, result) => {
    const data = await fetchCoronaData()
    data.forEach( async (report) => {
        const dataValidation = await CoronaReport.findOne({FID: report.attributes.FID})

        if (dataValidation) {
            return error
        }

        const coronaReport = await new CoronaReport({
            FID: report.attributes.FID,
            kode_provinsi: report.attributes.Kode_Provi,
            provinsi: report.attributes.Provinsi,
            kasus_positif: report.attributes.Kasus_Posi,
            kasus_sembuh: report.attributes.Kasus_Semb,
            kasus_meninggal: report.attributes.Kasus_Meni
        })

        try {
            await coronaReport.save()
        } catch (e) {
            console.log(e)
        }
    })
}

const scheduler = () => {
    cron.schedule('00 00 01 * * *', async (error, result) => {
        const data = await fetchCoronaData();
        data.forEach( async (report) => {
            const coronaReport = await CoronaReport.findOne({FID: report.attributes.FID})
    
            if(!coronaReport) {
                return error
            }
    
            coronaReport.kode_provinsi = report.attributes.Kode_Provi,
            coronaReport.provinsi = report.attributes.Provinsi,
            coronaReport.kasus_positif = report.attributes.Kasus_Posi,
            coronaReport.kasus_sembuh = report.attributes.Kasus_Semb,
            coronaReport.kasus_meninggal = report.attributes.Kasus_Meni
            
            try {
                console.log('scheduler update success to run')
                await coronaReport.save()
            } catch (e) {
                console.log('scheduler update failed to run')
                console.log(e)
            }
        })
    })
}

module.exports = {
    initData,
    scheduler
}