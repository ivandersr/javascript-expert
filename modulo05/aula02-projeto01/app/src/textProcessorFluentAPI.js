// o objetivo do Fluent API é executar tarefas como um pipeline, step by step
// e no fim chama o build. Muito similar ao padrão Builder, a diferença é que
// aqui é sobre processos, e o build lida com construção de objetos
class TextProcessorFluentAPI {
  // propriedade privada
  #content
  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    // ?<= fala que vai extrair os dados que virão depois deste grupo
    // [contratante|contratada] ou um ou outro (e tem a flag no fim da expressão
    // para pegar maiúsculo e minúsculo (i))
    // :\s{1} depois dessa expressão deve haver dois pontos seguido de um espaço
    // tudo até agora fica dentro de parênteses, indicando que "vamos pegar daí 
    // pra frente"
    // (?!\s) ignora o match que houver um segundo espaço, negative look around
    // isso ignora os contratantes no fim do documento
    // .*\n.*? pega tudo até a primeira quebra de linha e, em seguida, pega tudo
    // até a primeira recorrência (non greedy), evitando loops
    // $ informa que a pesquisa termina no final da linha
    // g global: procura todas as ocorrencias deste padrão
    // m multiline: pode retornar mais de uma linha
    // i case insensitive
    const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi;
    // faz o match para encontrar a string inteira e retorna um array com todas
    // as strings que estão no padrão informado
    const onlyPerson = this.#content.match(matchPerson);
    this.#content = onlyPerson;
    console.log('onlyPerson', onlyPerson);
    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;