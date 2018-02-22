import express from 'express';

import readExcel from '../lib/excel/read';

const router = express.Router();

router.post('/', function (request, response, next) {
    let settings = null;
    let priceRange = null;
    request.pipe(request.busboy);

    request.busboy.on('field', function (key, value) {
        if (key === 'settings') settings = JSON.parse(value);
        else if (key === 'priceRange') priceRange = JSON.parse(value);

    });

    request.busboy.on('file', function (fieldname, file, filename) {

        readExcel(file, settings, priceRange)
            .then(productsForParse => {

                response.send(productsForParse);
            })
            .catch(err => next(err));
    });
});


export default router;