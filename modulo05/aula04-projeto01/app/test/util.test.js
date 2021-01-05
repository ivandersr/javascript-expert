const { describe, it } = require('mocha');
const { expect } = require('chai');
const { evaluateRegex, InvalidRegexError } = require('./../src/util');

describe('Util', () => {
  it('#evaluateRegex should throw an exception when an unsafe regex is '
    + 'used', () => {
      const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/;

      expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe!`);
    });

  it('#evaluateRegex should not throw an exception when a safe regex is used',
    () => {
      const safeRegex = /^([a-z])$/;
      expect(() => evaluateRegex(safeRegex)).to.not.throw();
      expect(evaluateRegex(safeRegex)).to.be.ok;
    });
});