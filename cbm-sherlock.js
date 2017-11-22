'use strict';

const CallByMeaning = require('cbm-api');
const cbm = new CallByMeaning();

(async function main() {
  //  *0. Read the file
  const readFile = eval((await cbm.call(['file', 'mode'], ['file', 'read'], 'file', 'file', true)).body);
  const sherlockFile = readFile('./lib/sherlock.txt');

  //  *1. Create an array containing every word
  const tokenize = eval((await cbm.call('string', 'string', 'array', 'token', true)).body);
  let sherlock = tokenize(sherlockFile);

  //  *2. Remove unnecessary words
  //    *a. Join concecutive words that start with Uppercase i.e ['Sherlock', 'Holmes'] -> ['Sherlock Holmes']
  const capitalize = eval((await cbm.call('string', 'string', 'string', 'capitalized', true)).body);
  const punctuation = new RegExp(/^['!"#$%&\\'()*+,\-./:;<=>?@[\\\]^_`{|}~']/);
  for (let i = 0; i < sherlock.length; i++) {
    if (sherlock[i] === capitalize(sherlock[i]) && !punctuation.test(sherlock[i])) {
      if (sherlock[i + 1] === capitalize(sherlock[i + 1]) && !punctuation.test(sherlock[i + 1])) {
        sherlock[i] += ' '.concat(sherlock[i + 1]);
        sherlock[i + 1] = sherlock[i + 1].toLowerCase();
        if (sherlock[i + 2] === capitalize(sherlock[i + 2]) && !punctuation.test(sherlock[i + 2])) {
          sherlock[i] += ' '.concat(sherlock[i + 2]);
          sherlock[i + 2] = sherlock[i + 2].toLowerCase();
        }
      }
    }
  }
  //    *b. Remove words that don't start with an uppercase letter but keep periods
  sherlock = sherlock.filter((word) => (word === capitalize(word) || punctuation.test(word)) && word !== 'I'); // I is a special case

  //  3. Remove words that are after a punctuation point (and also the point itself)
  let temp = [];

  for (let i = 0; i < sherlock.length; i++) {
    if (punctuation.test(sherlock[i])) continue;
    if (punctuation.test(sherlock[i - 1])) continue;
    temp.push(sherlock[i]);
  }
  sherlock = temp;

  //  4. Remove words that are in ALL CAPS
  sherlock = sherlock.filter((word) => word !== word.toUpperCase());

  //  *5. Remove dublicates
  //    a. Things that appear more than once
  sherlock = (await cbm.call('array', 'array', [sherlock], 'array', 'unique')).body;

  //    b. Things that are the "same" i.e 'Holmes', 'Sherlock', 'Sherlock Holmes'
  sherlock = sherlock.filter((w, i, a) => {
    for (let word of a) {
      if (word.indexOf(w) > -1 && word !== w) return word.length < w.length;
    }
    return true;
  });

  //  6. Write them to a file
  try {
    const writeFile = eval((await cbm.call(['file', 'mode'], ['file', 'write'], ['file'], ['file'], true)).body);
    writeFile(sherlock, __dirname.concat('/results/cbm.txt'));
    return 'Done!';
  } catch (error) {
    return console.error(error);
  }
})().then((v) => console.log(v));