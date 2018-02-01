import express from 'express';

import readExcel from '../lib/excel/read';

const router = express.Router();

router.post('/', function (request, response, next) {
    let settings = null;
    request.pipe(request.busboy);

    request.busboy.on('field', function (key, value) {
        settings = JSON.parse(value);
    });

    request.busboy.on('file', function (fieldname, file, filename) {

        readExcel(file, settings)
            .then(productsForParse => {

                response.send(productsForParse);
            })
            .catch(err => next(err));
    });
});


export default router;