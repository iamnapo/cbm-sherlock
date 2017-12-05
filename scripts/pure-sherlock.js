const fs = require('fs');
const natural = require('natural');

const tokenizer = new natural.WordPunctTokenizer();

function main() {
  //  0. Read the file
  const sherlockFile = fs.readFileSync('./lib/sherlock.txt', 'utf8');

  //  1. Create an array containing every word
  let sherlock = tokenizer.tokenize(sherlockFile.replace(/(\r\n|\n)/gm, ' ').replace(/(\r)/gm, ''));

  //  2. Remove unnecessary words
  //    a. Join concecutive words that start with Uppercase i.e ['Sherlock', 'Holmes'] -> ['Sherlock Holmes']
  const upperCase = new RegExp(/^[A-Z]/);
  const punctuation = new RegExp(/^['!"#$%&\\'()*+,\-./:;<=>?@[\\\]^_`{|}~']/);
  for (let i = 0; i < sherlock.length; i += 1) {
    if (upperCase.test(sherlock[i]) && !punctuation.test(sherlock[i])) {
      if (upperCase.test(sherlock[i + 1]) && !punctuation.test(sherlock[i + 1])) {
        sherlock[i] += ' '.concat(sherlock[i + 1]);
        sherlock[i + 1] = sherlock[i + 1].toLowerCase();
        if (upperCase.test(sherlock[i + 2]) && !punctuation.test(sherlock[i + 2])) {
          sherlock[i] += ' '.concat(sherlock[i + 2]);
          sherlock[i + 2] = sherlock[i + 2].toLowerCase();
        }
      }
    }
  }
  //    b. Remove words that don't start with an uppercase letter but keep periods
  sherlock = sherlock.filter(word => (upperCase.test(word) || punctuation.test(word)) && word !== 'I'); // I is a special case

  //  3. Remove words that are after a punctuation point (and also the point itself)
  const temp = [];
  for (let i = 0; i < sherlock.length; i += 1) {
    if (!punctuation.test(sherlock[i]) && !punctuation.test(sherlock[i - 1])) temp.push(sherlock[i]);
  }
  sherlock = temp;

  //  4. Remove words that are in ALL CAPS
  sherlock = sherlock.filter(word => word !== word.toUpperCase());

  //  5. Remove dublicates
  //    a. Things that appear more than once
  sherlock = [...new Set(sherlock)];

  //    b. Things that are the same i.e 'Holmes', 'Sherlock', 'Sherlock Holmes'
  sherlock = sherlock.filter((w, i, a) => {
    a.forEach((word) => {
      if (word.indexOf(w) > -1 && word !== w) return word.length < w.length;
    });
    return true;
  });

  //  6. Sort the results
  sherlock = sherlock.sort();

  //  7. Write them to a file
  try {
    fs.writeFileSync(__dirname.concat('/../results/pure.txt'), sherlock, ['utf8', 0o666, 'w+']);
    return 'Done!';
  } catch (error) {
    return toString(error);
  }
}

module.exports = main;
