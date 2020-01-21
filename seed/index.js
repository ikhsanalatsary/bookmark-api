const Model = require('../model/init');
const got = require('got').default;
const Quote = require('../model/quote.model');

(async function seed() {
  await Model.init();
  let count = await Quote.countDocuments();
  count && await Quote.collection.drop();
  const { body } = await got(
    'https://quote-garden.herokuapp.com/quotes/all'
  );
  const {results} = JSON.parse(body);
  for (let i = 0; i < results.length; i++) {
    const data = results[i];
    const payload = { text: data.quoteText, author: data.quoteAuthor };
    const quote = new Quote(payload);
    await quote.save();
    console.log('saved quote = ', JSON.stringify(payload, null, 2));
  }
  console.log('Quotes saved');
  process.exit(0);
})();
