const { evaluateRegex } = require('./util');
class Person {
  // (\w+)?\s.*
  // $1,
  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado,
  ]) {
    // ^ => começo da string
    // + => uma ou mais ocorrências
    // (\w{1}) => pega só a primeira letra e deixa em um grupo
    // ([a-zA-z]+) => todas as outras letras após a primeira até o final da linha
    // g => continua procurando por outras ocorrências (global)
    const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g);

    const formatFirstLetter = (prop) => {
      return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
        return `${group1.toUpperCase()}${group2.toLowerCase()}`;
      });
    }

    // (\w+),
    // this.$1 = $1;
    this.nome = nome;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);
    // tudo que não for dígito vira vazio (\D)
    // /g serve para todas ocorrências
    this.documento = documento.replace(evaluateRegex(/\D/g), "");
    // ?<=\sa\s => positive look behind: só considera o que vier após " a "
    // .*$ => tudo até o final da linha
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join();
    this.numero = numero;
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join();
    this.estado = estado.replace(evaluateRegex(/\.$/), "");
  }
}

module.exports = Person;