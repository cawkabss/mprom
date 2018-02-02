import express from 'express';

import Product from '../models/product';
import Provider from '../models/provider';
import Shop from '../models/shop';

const router = express.Router();

router.get('/', (req, res, next) => {
    Product.find()
        .populate('provider')
        .then(providers => res.send(providers))
        .catch(err => next(err));
});

router.get('/find', (req, res, next) => {
    const query = req.query.query;

    if (query === 'all') {
        Product.find()
            .populate('provider')
            .then(providers => res.send(providers))
            .catch(err => next(err));
    }

    else {
        Product.find({vendorCode: {$regex : `${query}`, $options: "i"}})
            .populate('provider')
            .then(providers => res.send(providers))
            .catch(err => next(err));
    }
});

router.get('/findOne', (req, res, next) => {
    const queries = req.query;

    Product.findOne(queries)
        .then(product => {
            if (!product) {
                res.send(`Товар не найден`);
            }
            else {
                res.send(product);
            }
        })
        .catch(err => next(err));

});

router.get('/:id', (req, res, next) => {

    Product.findById(req.params.id)
        .then(product => {
            if (!product) {
                next(new Error('Товар не найден'));
            }
            else {
                res.send(product);
            }
        })
        .catch(err => next(err));

});

router.put('/:id', (req, res, next) => {

    const updatedProduct = req.body;

    Product.findByIdAndUpdate(req.params.id, updatedProduct, {new: true})
        .populate('provider')
        .then(product => {
            Provider.findById(product.provider)
                .then(provider => {
                    if (provider.categories.indexOf(product.category.name) === -1) {
                        provider.categories.push(product.category.name);

                        Promise.all([
                                provider.save(),
                                Shop.updateMany({providers: {$in: [provider._id]}}, {canSavePrice: false})
                            ])
                            .then(() => res.send(product))
                            .catch(err => next(err));

                    }
                    else {
                        res.send(product);
                    }
                })
        })
        .catch(err => next(err));

});

export default router;
