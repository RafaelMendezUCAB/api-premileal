const FormData = require('form-data');
const axios = require("axios");

module.exports = {
    getTranslatedTerms: (lang) => {
        const data = new FormData();
        data.append("api_token", '67c875871b5ffe42d486331c21da7325');
        data.append("id", "345669");
        data.append("language", lang);
        return axios.post("https://api.poeditor.com/v2/terms/list", data, {
            headers: data.getHeaders(),
        })
        .catch((error) => {
            console.log("error")
            return new Error(error);
        });
    },    
}