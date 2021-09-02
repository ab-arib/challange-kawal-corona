const request = require ('postman-request');
let url = 'https://api.kawalcorona.com/indonesia/provinsi/';
let options = {json: true};

const fetchCoronaData = () => {
    return new Promise((resolve, reject) => {
        request(url, options, (error, res, body) => {
            if (error) {
                reject(error);
                return;
            }
        
            if (!error && res.statusCode == 200) {
                resolve(body);
            }
        })
    });
}

module.exports = fetchCoronaData;