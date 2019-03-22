var express = require('express');
var app = express();

app.get('/todos/get', function(request, response) {
  response.send({ resultMessage: 'good' });
});

app.post('/todos/write', function(req, res) {
  if (req.body) {
    res.send('you should send sth');
  }
  var data = req.body;
  mongoDB.save(data);
  res.send('success');
});

app.put(`/todo/${id}`, );
app.delete();