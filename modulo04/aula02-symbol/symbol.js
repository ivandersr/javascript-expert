const assert = require('assert');

// keys
const uniqueKey = Symbol('username');
const user = {};

user['username'] = 'Valor para chave com string';
user[uniqueKey] = 'Valor para chave com Symbol';

assert.deepStrictEqual(user.username, 'Valor para chave com string');
assert.deepStrictEqual(user[Symbol('username')], undefined);
assert.deepStrictEqual(user[uniqueKey], 'Valor para chave com Symbol');
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

user[Symbol.for('password')] = 123;
assert.deepStrictEqual(user[Symbol.for('password')], 123);

// Well known symbols
const obj = {
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop(),
      }
    }
  })
}

assert.deepStrictEqual([...obj], ['a', 'b', 'c']);

const kItems = Symbol('kItems');

class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }

  get [Symbol.toStringTag]() {
    return 'MyDate';
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError();
    const items = this[kItems]
      .map(item => new Intl.DateTimeFormat(
        'pt-BR', { month: 'long', day: '2-digit', year: 'numeric' }
      ).format(item));
    return new Intl.ListFormat(
      'pt-BR', { style: 'long', type: 'conjunction' }
    ).format(items);
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms));
    for (const item of this[kItems]) {
      await timeout(100);
      yield item.toISOString();
    }
  }
}

const myDate = new MyDate(
  [2020, 01, 01],
  [2014, 04, 24],
  [1992, 05, 05]
);

const expectedDates = [
  new Date(2020, 01, 01),
  new Date(2014, 04, 24),
  new Date(1992, 05, 05)
];

assert.deepStrictEqual(myDate[kItems], expectedDates);
assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object MyDate]');
assert.throws(() => myDate + 1, TypeError);
assert.deepStrictEqual(String(myDate),
  '01 de fevereiro de 2020, 24 de maio de 2014 e 05 de junho de 1992');
assert.deepStrictEqual([...myDate], expectedDates);

(async () => {
  const dates = await Promise.all([...myDate]);
  assert.deepStrictEqual(dates, expectedDates);
})();
// asyncIterator 2020-02-01T03:00:00.000Z
// asyncIterator 2014-05-24T03:00:00.000Z
// asyncIterator 1992-06-05T03:00:00.000Z