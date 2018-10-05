const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const env = require('./env');
const path = require('path');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

const swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:4000',
  basePath: '/',
};
// options for the swagger docs
var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./**/routes/*.js'],
};
// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);


app.get('/swagger.json', (req, res) => { 
  res.setHeader('Content-Type', 'application/json'); 
  res.send(swaggerSpec); 
});


const dbURI = 'mongodb://localhost:27017/rest-api';

// Mongoose connect
// mongoose.connect('mongodb://'+ env.MONGO_ATLAS.USERNAME +':'+ env.MONGO_ATLAS.PASSWORD +'@cluster0-shard-00-00-zfwrf.mongodb.net:27017,cluster0-shard-00-01-zfwrf.mongodb.net:27017,cluster0-shard-00-02-zfwrf.mongodb.net:27017/rest_api?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',{
//   // useNewUrlParser: true
// });
// mongoose.connect('mongodb+srv://anji:anji@cluster0-zfwrf.mongodb.net/test?retryWrites=true');
mongoose.connect(dbURI);

// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected Successfully');
});
// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});


// Morgan middleware to handle all requests and add logs
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
// static folder
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
// Handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
})

// Routes 
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user', userRoutes);

// If no routes found 
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 400;
  next(error);
});

// To handle all the errors in the code
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      'message': error.message
    }
  })
});

module.exports = app;