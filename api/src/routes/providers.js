import express from 'express';
import mongoose from 'mongoose';

import Provider from '../models/provider';
import Product from '../models/product';
import Order from '../models/order';
import Shop from '../models/shop';

const router = express.Router();

router.get('/', (req, res, next) => {
    Provider.find()
        .then(providers => res.send(providers))
        .catch(err => next(err));
});

router.post('/', function (req, res, next) {
    const providerData = req.body;

    const newProvider = new Provider(providerData);

    newProvider.save()
        .then(provider => res.send(provider))
        .catch(err => {
            if (err.code === 11000) {
                next(new Error('Имя или префикс уже использутся!'));
            }
            else {
                next(err);
            }
        });
});

router.get('/:id', (req, res, next) => {
    Provider.findById(req.params.id)
        .then(provider => res.send(provider))
        .catch(err => next(err));

});

router.put('/:id', (req, res, next) => {
    const updatedProvider = req.body;

    Provider.findByIdAndUpdate(req.params.id, updatedProvider, {new: true})
        .then(provider => res.send(provider))
        .catch(err => {
            if (err.code === 11000) {
                next(new Error('Имя или префикс уже использутся!'));
            }
            else {
                next(err);
            }
        });

});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    Promise.all([
        Provider.findByIdAndRemove({_id: id}),
        Product.remove({provider: id}),
        Order.remove({provider: id}),
        Shop.update({providers: {$in: [id]}}, {$pull: {providers:id}})
    ])
        .then(() => res.send(id))
        .catch(err => next(err))

});

router.get('/:id/products', (req, res, next) => {
    const providerId = req.params.id;

    Product.find({'provider': providerId})
        .then(products => res.send(products))
        .catch(err => next(err));

});

router.get('/:id/statistics', (req, res, next) => {
    const providerId = req.params.id;

    Promise.all([
        Product.count({provider: providerId}),
        Product.count({
            provider: providerId,
            isDone: true
        }),
        Product.count({
            provider: providerId,
            available: '-'
        })
    ])
        .then(result => {
            const data = {
                allProductsCount: result[0],
                doneProductsCount: result[1],
                unAvailableProductsCount: result[2]
            };

            res.send(data);
        })
        .catch(err => next(err));
});

router.put('/:id/products', (req, res, next) => {
    const providerId = req.params.id;
    let updatedProducts = req.body.updatedProducts;
    let newProducts = req.body.newProducts;

    newProducts = newProducts.map(product => {
        return {
            insertOne:
                {
                    "document":
                        {
                            "_id": mongoose.Types.ObjectId(),
                            ...product
                        }
                }
        }
    });

    updatedProducts = updatedProducts.map(product => {
        return {
            updateOne:
                {
                    "filter": {"_id": product._id},
                    "update": {
                        $set: {
                            "price": product.price,
                            "available": product.available,
                            "counts": product.counts,
                        }
                    }
                }
        }
    });

    Product.bulkWrite([
        ...newProducts,
        ...updatedProducts
    ])
        .then(() => {
            Promise.all([
                Provider.findByIdAndUpdate(providerId, {updateTime: Date.now()}, {new: true}),
                Product.find({'provider': providerId})
            ])
                .then(result => res.send(result))
                .catch(err => next(err));
        });
});

export default router;
