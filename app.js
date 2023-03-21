const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const eateryList = require('./restaurant.json');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { eateries: eateryList.results });
});

app.get('/eateries/:eatery_id', (req, res) => {
  const eatery = eateryList.results.find(
    (eatery) => eatery.id.toString() === req.params.eatery_id
  );

  res.render('show', { eatery: eatery });
});

app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  const eateries = eateryList.results.filter((eatery) => {
    return eatery.name.toLowerCase().includes(keyword.toLowerCase());
  });
  res.render('index', { eateries: eateries, keyword: keyword });
});

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
