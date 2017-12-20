# __ARCHIVED__. Check [cbmjs/cbm-sherlock](https://github.com/cbmjs/cbm-sherlock)

# cbm-sherlock

A small script that uses the CallByMeaning project to deduce(🕵🏼) the number of characters that appear in the book The Adventures of Sherlock Holmes: A scandal in Bohemia.

## Getting Started

You can use the default configuration with the server running on Heroku and the database running on MLab and just use the default constructor of the cbm class:

```javascript
const CallByMeaning = require('cbm-api');
const cbm = new CallByMeaning();
```

> Note: this is what I'm doing here.

But, if you don't want to do that, you need to run the [CallByMeaning Server](https://github.com/iamnapo/CallByMeaning) locally and replace the default constructor with your host:

```javascript
const CallByMeaning = require('cbm-api');
const cbm = new CallByMeaning('http://james.bond:007');
```

Other than that, the comparison between `cbm-sherlock.js` and `pure-sherlock.js` is pretty self-explanatory.

---

## License

[AGPL-3.0 license](https://opensource.org/licenses/AGPL-3.0).
