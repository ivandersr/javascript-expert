// Sets são conjuntos matemáticos, ou seja, conjuntos de elementos únicos
// Caso sejam adicionados elementos repetidos, o set os ignora.
const assert = require('assert');

const arr1 = ["0", "1", "2"];
const arr2 = ["2", "0", "3"];

const arr3 = arr1.concat(arr2);

assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3']);

// caso queiramos ítens únicos, teríamos de iterar sobre as listas e realizar
// as tratativas adequadas

// Utilizando o Set, podemos percorrer todos os arrays desejados e adicionar 
// seus ítens um a um e, caso haja repetição, este ítem é ignorado.
const set = new Set();
arr1.map(item => set.add(item));
arr2.map(item => set.add(item));
assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3']);

// Podemos utilizar spread operators nos arrays desejados, para que cada elemento
// seja tomado individualmente e adicionado ao Set.

assert.deepStrictEqual(
  Array.from(new Set([...arr1, ...arr2])),
  ['0', '1', '2', '3']
);

// Keys e Values existem em sets assim como em outras estruturas.
// Porém, são o mesmo valor, pois os elementos são únicos e dispensam chaves.
// Os dois atributos existem apenas para manter a compatibilidade com outras
// estruturas.
// console.log('set.keys', set.keys());
// console.log('set.values', set.values());
assert.deepStrictEqual(set.keys(), set.values());

// Em um Array padrão, para verificar a existência do item
// [].indexOf(item) !== -1 ou [0].includes(0)

// Para sets, temos o "has", que retorna um boolean indicando se o ítem existe.
assert.ok(set.has('3'));

// Em Sets, não temos o "get", então trabalhamos com a coleção inteira.
// Na documentação, há exemplos sobre como realizar interações

// Elemento existe nos dois arrays
// Realizamos a intersecção, criando um novo set e, para cada item do primeiro 
// set, filtramos com o boolean retornado do "has" no segundo set para o item 
// atual da iteração.
const users01 = new Set([
  'Ivander',
  'Catsui',
  'Raccoon'
]);

const users02 = new Set([
  'Alev',
  'Ivander',
  'Astatine'
]);

const intersection = new Set([...users01].filter(user => users02.has(user)));
assert.deepStrictEqual(Array.from(intersection), ['Ivander']);

// Diferença
// Da mesma maneira, filtramos cada item do primeiro set, mas agora negando
// a existência no segundo set. Desta maneira, realizamos a diferença entre
// conjuntos, removendo os ítens repetidos presentes no primeiro set
const difference = new Set([...users01].filter(user => !users02.has(user)));
assert.deepStrictEqual(Array.from(difference), ['Catsui', 'Raccoon']);

// weakSet
// Mesma ideia do WeakMap, não é enumerável (iterável), só trabalha com chaves
// como referência e só tem métodos simples. Mais performático.

const user = { id: 1234 };
const user2 = { id: 4321 };

const weakSet = new WeakSet([user]);
weakSet.add(user2);
weakSet.delete(user);
weakSet.has(user);