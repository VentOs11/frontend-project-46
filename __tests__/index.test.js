import url from 'url';
import path, { dirname } from 'node:path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1OutputDefault = readFile('file.txt');
const file1OutputPlain = readFile('file_plain.txt');
const file1OutputJson = readFile('file_json.txt');
const file1 = './__fixtures__/file1.json';
const file2 = './__fixtures__/file2.json';
const file3 = './__fixtures__/file1.yml';
const file4 = './__fixtures__/file2.yml';

describe('comparing  files', () => {
  test('simple using', () => {
    expect(genDiff(file1, file2)).toEqual(file1OutputDefault);
    expect(genDiff(file3, file4, 'plain')).toEqual(file1OutputPlain);
    expect(genDiff(file3, file4, 'json')).toEqual(file1OutputJson);
  });
});
