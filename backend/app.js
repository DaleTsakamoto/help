const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const csurf = require('csurf')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const {ValidationError} = require('sequelize')

const { environment } = require('./config')
const isProduction = environment === 'production';
const routes = require('./routes');

const app = express();
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())


/****************** SECURITY MIDDLEWARE **************************/
if (!isProduction) {
  app.use(cors());
}
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);


/****************** ROUTES **************************/

app.use(routes);



/****************** ERROR HANDLING **************************/

// Create server error if all other routes fail
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The resquested resource couldn't be found."];
  next(err);
});

//Error in sequelize
app.use((err, req, res, next) => {
  //check for Sequelize error
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err)
})

//Formatting
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;



