// A ideia do Facade é abstrair a execução
// É ele que chama o pipeline
const TextProcessorFluentAPI = require('./textProcessorFluentAPI');

class TextProcessorFacade {
  #textProcessorFluentApi
  constructor(text) {
    this.#textProcessorFluentApi = new TextProcessorFluentAPI(text);
  }

  getPeopleFromPDF() {
    return this.#textProcessorFluentApi
      .extractPeopleData()
      .divideTextInColumns()
      .removeEmptyCharacters()
      .mapPerson()
      .build();
  }
}

module.exports = TextProcessorFacade;