const bodyParser = require('body-parser');
const express = require('express');
const db = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const app = new express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter = require('./routes/authRoutes')
const productRoute = require('./routes/productRoute')
const blogRoute = require('./routes/blogRoutes')
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

db();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user',authRouter);
app.use('/api/product',productRoute);
app.use('/api/blog',blogRoute);

app.use(notFound);
app.use(errorHandler);
app.listen(3000);