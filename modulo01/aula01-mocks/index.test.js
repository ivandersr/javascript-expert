const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/fourItems-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/threeItems-valid.csv';
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        "name": "Ivander Salvador Ruiz",
        "id": 123,
        "profession": "Javascript Developer",
        "birthDay": 1991
      },
      {
        "name": "Xuxa da Silva",
        "id": 321,
        "profession": "Javascript Expert",
        "birthDay": 1929
      },
      {
        "name": "Jão",
        "id": 231,
        "profession": "React Developer",
        "birthDay": 1998
      }
    ];
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }


})();