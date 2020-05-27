module.exports = {
/* --------------------------- GET ------------------------- */

  getLanguageTerms: async (con, lang) => {

    try {

      const termsTranslated = await poe.getTranslatedTerms(lang);

      let translations = [];

      termsTranslated.data.result.terms.forEach(term => {
          translations.push({
              name: term.context,
              text: term.translation.content
          });
      });    

      res.json(translations);

    } catch (error) {
        console.log(error);
        res.json(error);
    }
  },

};
