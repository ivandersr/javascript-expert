const assert = require('assert');
const myMap = new Map();

// pode ter qualquer coisa como chave
myMap
  .set(1, 'one')
  .set('Ivander', { text: 'two' })
  .set(true, () => 'hello');

// usando um constructor
const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1'],
]);

// console.log('myMap', myMap);
assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Ivander'), { text: 'two' });
assert.deepStrictEqual(myMap.get(true)(), 'hello');

// Em Objects, a chave só pode ser string ou symbol (ocorre coerção para string);
// Em maps, se tentarmos realizar o "get" passando um objeto como parâmetro, 
// devemos fazê-lo por referência
const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: 'Ivander' });
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Ivander' });

// Utilitários
// - No Object seria Object.keys({a: 1}).length para descobrir quantas chaves temos
// - Em Maps, temos o .size
assert.deepStrictEqual(myMap.size, 4);

// - No Object, utilizamos item.key para verificar a existência de uma chave
// item.key = undefined, caso não exista
// if() = coerção para boolean e retorna false
// o jeito correto seria em Object seria ({name: 'Ivander'}).hasOwnProperty('name');
// Em Maps, utilizamos o .has
assert.ok(myMap.has(onlyReferenceWorks));

// para remover item dos objetos
// delete item.id 
// Esta forma é imperformática e não deve ser utilizada
// Em Maps, temos o .delete, que retorna um boolean representando o sucesso ou não da remoção da chave
assert.ok(myMap.delete(onlyReferenceWorks));
assert.ok(!myMap.delete('chaveInexistente'));

// Não é possível iterar sobre um Object de forma direta, sendo necessário utilizar Object.entries
// Em Maps, é implementado o padrão generators
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([[1, "one"], ["Ivander", { "text": "two" }], [true, () => { }]])
);

// for (const [key, value] of myMap) {
//   console.log({ key, value });
// }

// Object é inseguro, pois dependendo do noem da chave, pode-se substituir um comportamento
// ({ }).toString() === '[object Object]'
// ({ toString: () => 'Hey' }).toString() === 'Hey'

// Qualquer chave pode colidir com propriedades herdadas no prototype chain, 
// como constructor, toString, valueOf, etc.

const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen: Xuxa',
};

// Não há restrições de nomes de chaves em Maps
myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// Não dá para limpar um Object sem reassiná-lo
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// WeakMaps são mais performáticos, mas só permitem objetos como chaves
// Será coletado após os endereços de memória deixarem o contexto, prevê memory leak
// Exemplo: armazenamento de erros
// tem a maioria dos benefícios do Map, mas não é iterável
// Só chaves de referência existentes

const weakMap = new WeakMap();

const hero = { name: 'Flash' };

weakMap.set(hero);
console.log(weakMap.get(hero));
console.log(weakMap.delete(hero));
console.log(weakMap.has(hero));