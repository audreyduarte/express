var express = require('express');
var axios = require('axios');
const { body, validationResult } = require('express-validator');
var router = express.Router();
var url = 'https://davidosn.herokuapp.com/clientes'

/* GET todos os alunos. */
router.get('/', function (req, res, next) {
  axios.get(url)
    .then(function (response) {
      console.log(response.data);
      res.render('pages/clientes/clientes-list', { clientes: response.data, title: 'Lista de clientes' });
    })
    .catch(function (error) {
      res.render('pages/server-off', { title: 'Estamos com problema em nosso servidor, tente novamente em outro momento' });
      console.log(error);
    })
});


/* Pegar aluno pelo id. */
router.get('/edit/:id', function (req, res, next) {
  axios.get(`${url}/${req.params.id}`)
    .then(function (response) {
      console.log(response.data);
      res.render('pages/clientes/clientes-form', {
        title: 'Editar Cliente',
        data: response.data,
        route: 'update',
      });
    })
    .catch(function (error) {
      res.render('pages/server-off', { title: 'Estamos com problema, tente outro em outro momento' });
      console.log(error);
    })
});

router.get('/add', function (req, res, next) {
  res.render('pages/clientes/clientes-form', {
    title: 'Adicionar cliente',
    data: { nome: '', sexo: '', data_nasc: '', rg: '' },
    route: 'save',
  });
});

// GET aluno pelo ID
router.get('/:search', function (req, res, next) {
  // res.send(`respond os cursos pelo id ${req.params.id}`);
  // console.log(`respond os cursos pelo id ${req.params.search}`);
  axios.get(`${url}?nome_like=${req.params.search}`)
    .then(function (response) {
      console.log('search', response.data);
      res.render('pages/clientes/clientes-list', { clientes: response.data, title: 'Lista de clientes' });
    })
    .catch(function (error) {
      res.render('pages/server-off', { title: 'Estamos com problema, tente outro em outro momento' });
      console.log(error);
    })
});

// POST aluno
router.post('/save',
  body('nome')
    .isLength({ min: 5 })
    .withMessage('O nome deve ter no mínimo 5 caracteres'),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send(errors.array());
    } else {
      console.log('tem erros else', errors.array());
      axios.post(url, req.body)
        .then(function (response) {
          // console.log(response);
          res.redirect('/clientes');
        })
        .catch(function (error) {
          res.render('pages/server-off', { title: 'Estamos com problema, tente outro em outro momento' });
          console.log(error);
        });
    }
  });

router.post('/update', function (req, res, next) {
  console.log('passei no put', req.body.id);
  axios.patch(`${url}/${req.body.id}`, req.body)
    .then(function (response) {
      res.redirect('/clientes');
      console.log(response);
    })
    .catch(function (error) {
      res.render('pages/server-off', { title: 'Estamos com problema, tente outro em outro momento' });
      console.log(error);
    });
});

router.get('/remove/:id', function (req, res, next) {
  axios.delete(`${url}/${req.params.id}`)
    .then(function (response) {
      setTimeout(() => {
        res.redirect('/clientes');
      }, 1000);
      console.log(response);
    })
    .catch(function (error) {
      res.render('pages/server-off', { title: 'Estamos com problema, tente outro em outro momento' });
      console.log(error);
    });
});

module.exports = router;
