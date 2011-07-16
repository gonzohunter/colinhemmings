/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

// TODO: move routing to a seperate routing module
var products = require('./products');
app.get('/products', function(req, res){
	res.render('products', {
		title: 'Products',
		products: products.all
	});
});

app.get('/products/:id', function(req, res){
	var product = products.find(req.params.id);
	res.render('products/show', {
		title: 'Product',
		product: product
	})
});

app.get('/products/:id/edit', function(req, res){
	var product = products.find(req.params.id);
	res.render('products/edit', {
		title: 'Edit Product',
		product: product
	})
});

app.get('/', function(req, res){
	req.session.visitCount = req.session.visitCount ? req.session.visitCount + 1 : 1;
  res.render('index', {
    title: 'Express',
		item: 'visits: ' + req.session.visitCount
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
