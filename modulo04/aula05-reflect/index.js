// Comum em várias linguagens, intercepta comportamentos padrão para adicionar
// novos comportamentos
// Garante a semântica e segurança em objetos
'use strinct';

const assert = require('assert');

// ---- apply
// Utilizado para adicionar valores ao contexto
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  }
};


// Um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita')}
// Substituição do comportamento da função no prototype.
// Pode-se realizar isso com bibliotecas (substituição de prototype no import)

// Esse aqui pode acontecer com mais frequência...
// Captura de dados da função por meio da atribuição direta do método apply
// sobrescrevendo seu comportamento.
// myObj.add.apply = () => { throw new Error('Te peguei') };

myObj.add.apply = () => { throw new TypeError('Te peguei') };
assert.throws(
  () => myObj.add.apply({}, []),
  {
    name: 'TypeError',
    message: 'Te peguei',
  }
);

// Utilizando reflect, a sobrescrita acima será ignorada, pois, em vez de 
// acessaros o apply da função, utilizamos o apply de Reflect, passando a nossa
// função como primeiro argumento, seu contexto como segundo e os argumentos
// referentes à nossa função com terceiro.
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);

// ----defineProperty
// Mais utilizado para questões semânticas. Para definir uma propriedade de uma
// função ou classe, fica mais bonitão

// Pode-ser utilizar Object ou Reflect
const myDate = () => { };

Object.defineProperty(
  myDate,
  'withObject',
  { value: () => 'Hello with object' }
);

Reflect.defineProperty(
  myDate,
  'withReflect',
  { value: () => 'Hello with reflect' }
);

assert.deepStrictEqual(myDate.withObject(), 'Hello with object');
assert.deepStrictEqual(myDate.withReflect(), 'Hello with reflect');

// ----deleteProperty
const withDelete = { user: 'Ivander' };
delete withDelete.user;  // Imperformático e deve ser evitado

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const withReflect = { user: 'Raccoon' };
Reflect.deleteProperty(withReflect, 'user');

assert.deepStrictEqual(withReflect.hasOwnProperty('user'), false);

// ----get
// Deveríamos fazer "get" somente em instâncias de referência
assert.deepStrictEqual(1['userName'], undefined);
// com reflection, uma exceção é lançada
assert.throws(() => Reflect.get(1, 'userName'), TypeError);

// ----has
// Novamente, com Reflect fica mais semântico
assert.ok('superman' in { superman: '' });
assert.ok(Reflect.has({ batman: '' }, 'batman'));

// ----ownKeys
// Para tomar Symbols e Objects, devemos fazer duas chamadas
const user = Symbol('user');
const dbUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'ivandersr'
};

// Utilizando os métodos de Object
const objectKeys = [
  ...Object.getOwnPropertyNames(dbUser),
  ...Object.getOwnPropertySymbols(dbUser)
];

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user]);

// Com Reflect, realizamos uma única chamada
// Indicado para realizar cópias seguras de objetos
assert.deepStrictEqual(
  Reflect.ownKeys(dbUser),
  ['id', Symbol.for('password'), user]
);
