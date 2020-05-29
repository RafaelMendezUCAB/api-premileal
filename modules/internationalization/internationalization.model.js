const poEditor = require('../../utils/POeditor/poEditor');;

module.exports = {
/* --------------------------- GET ------------------------- */

  getLanguageTerms: async (con, lang) => {

    try {
      const termsTranslated = await poEditor.getTranslatedTerms(lang);
      let translations = [];

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
