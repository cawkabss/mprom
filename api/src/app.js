import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import busboy from 'connect-busboy';
import path from 'path';

import providers from './routes/providers';
import products from './routes/products';
import parsePrice from './routes/parsePrice';
import search from './routes/search';
import orders from './routes/orders';
import shops from './routes/shops';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(busboy());
app.use(cookieParser());

app.use('/api/providers', providers);
app.use('/api/products', products);
app.use('/api/parse-price-file', parsePrice);
app.use('/api/search', search);
app.use('/api/orders', orders);
app.use('/api/shops', shops);

if (process.env.NODE_ENV ? process.env.NODE_ENV.trim() === 'production' : false) {

    const staticFiles = express.static(path.join(__dirname, '../../client/build'));
    app.use(staticFiles);
    app.use('/*', staticFiles);
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page

    res.status(500);
    res.end(err.message);
});

export default app;
