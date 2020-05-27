const poEditor = require('../../utils/POeditor/poEditor');;

module.exports = {
/* --------------------------- GET ------------------------- */

  getLanguageTerms: async (con, lang) => {

    try {
      console.log("hola 1");
      const termsTranslated = await poEditor.getTranslatedTerms(lang);
      console.log("hola 2");
      let translations = [];

      console.log("THEY ARE ", termsTranslated)

      termsTranslated.data.result.terms.forEach(term => {
          translations.push({
              name: term.context,
              text: term.translation.content
          });
      });    

      return translations;

    } catch (error) {
        console.log(error);
        res.json(error);
    }
  },

};
