const express = require('express');
const app = express();
const Article = require('./db').article;

app.set('port', process.env.PORT || 8000)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('css/skeletonic.css',
  express.static('node_modules/skeletonic/dist/css/skeletonic.css'));

app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err)
    res.send('articles');
  });
  
});

app.post('/articles', (req, res, next) => {
  const url = req.body.url;
   
  read(url, (err, result) => {
    if (err || !result) res.status(500).send('Error downloading article');
    Article.create(
      { title: result.title, content: result.content },
      (err, article) => {
        if (err) return next(err)
        res.send('OK')
      }
    )
  })
})

app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err) return next(err)
    res.send('articles[id]');
  }); 
});

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
  Article.delete(id, (err) => {
    if(err) return next(err);
    res.send({message: deleted})
  })
  
});

app.listen(app.get('port'), () => {
  console.log('tomorrow is running on port', app.get('port'))
})

module.exports = app;