import express from 'express';

import {getPage, getProductsList, getProductsUrl} from "../lib/scraping/scraping";
const router = express.Router();

router.get('/', (req, res, next) => {

    const query = req.query.query;
    const maxCount = req.query.maxCount;
    const timeOut = req.query.timeOut;
    const cookie = req.query.cookie;

    const url = `https://prom.ua/search?search_term=${encodeURIComponent(query)}`;
    getPage(url, cookie)
        .then($ => {
            const isCaptcha = $('h1').text() === 'Защита от роботов';
            const isNotFound = $('.x-empty-results__title')
                .text().replace(/^\s+|\s+$/g, "") === 'По запросу ничего не найдено';

            if (isCaptcha) {
                res.send('captcha');
            }
            else if (isNotFound) {
                res.send([])
            }
            else {
                getProductsUrl($)
                    .then(data => getProductsList(data, cookie, maxCount, timeOut))
                    .then(products => res.send(products));
            }
        })
});

export default router;