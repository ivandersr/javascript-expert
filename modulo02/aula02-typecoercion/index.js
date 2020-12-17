const item = {
  name: 'Ivander',
  age: 29,
  toString() {
    console.log('toString invocado')
    return `Name: ${this.name}, Age: ${this.age}`
  },
  valueOf() {
    return { value: 007 };
  },
  [Symbol.toPrimitive](coertionType) {
    const types = {
      string: JSON.stringify(this),
      number: 0007
    }

    return types[coertionType] || types.string;
  }
};

console.assert(item + 0 === '{"name":"Ivander","age":29}0');
console.assert(!!item);
console.assert('Ae'.concat(item) === 'Ae{"name":"Ivander","age":29}');
console.assert(item == String(item));

const item2 = { ...item, name: 'Joana', age: 23 };
console.assert(item2.name === 'Joana' && item2.age === 23);