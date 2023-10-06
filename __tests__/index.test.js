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
const file1 = getFixturePath(`file1.${format}`);
const file2 = getFixturePath(`file2.${format}`);
const file3 = getFixturePath(`file1.${format}`);
const file4 = getFixturePath(`file2.${format}`);

describe('comparing  files', () => {
  test('simple using', () => {
    expect(genDiff(file1, file2)).toEqual(file1OutputDefault);
    expect(genDiff(file3, file4, 'plain')).toEqual(file1OutputPlain);
    expect(genDiff(file3, file4, 'json')).toEqual(file1OutputJson);
  });
});
