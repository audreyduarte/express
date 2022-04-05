var express = require('express');
var axios = require('axios');
var router = express.Router();
var urlAlunos = 'https://api-server-senac.herokuapp.com/alunos'
var urlClientes = 'https://audrey-clientes.herokuapp.com/clientes'
/* GET home page. */
router.get('/', function(req, res, next) {
  let dataAlunos = []
  let dataClientes = []

  axios.get(urlAlunos)
  .then(function (response) {
    dataAlunos = response.data
    // res.render('pages/index', { alunos: response.data });
  })
  .catch(function (error) {
    console.log(error);
  })

  axios.get(urlClientes)
  .then(function (response) {
    dataClientes = response.data
    res.render('pages/index', {alunos: dataAlunos, clientes: dataClientes});
  })
  .catch(function (error) {
    console.log(error);
  })
  
});

module.exports = router;
