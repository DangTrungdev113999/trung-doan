const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require("body-parser");
const app = express();


const dbConnect = require("./config/dbConnect");

const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

// connect to mongo
dbConnect();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 24 *1000 }
}))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.render("home")
})

app.get("/data-generation", async (req, res) => {
  let newUsers = [
    {
      username: "admin",
      password: 123,
      type: 1,
    },
    {
      username: "trung",
      password: 123,
      type: 2,
    },
    {
      username: "doan",
      password: 123,
      type: 2,
    },
    {
      username: "nam",
      password: 123,
      type: 3,
    }
  ]
  const User = require("./models/User");
  const ProductModel = require("./models/Product");
  await User.insertMany(newUsers);
  const { uniqueNamesGenerator } = require('unique-names-generator');
  const rn = require('random-number');
  let gen = rn.generator({
    min:  0,
    max:  1000,
    integer: true
  })
  gen()
  for(let i = 0; i <= 15; i++)  {
    let product = {
      name: uniqueNamesGenerator({length: 2}),
      price: gen()
    }
    await ProductModel.create(product);
  }

  res.redirect("/user/login");
})

app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
