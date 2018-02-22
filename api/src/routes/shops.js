import express from 'express';

import Product from '../models/product';
import Shop from '../models/shop';
import Order from '../models/order';
import writeExcel from "../lib/excel/writeExcel";

const router = express.Router();

router.get('/', (req, res, next) => {
    Shop.find()
        .then(shops => res.send(shops))
        .catch(err => next(err));
});

router.post('/', function (req, res, next) {
    const shopData = req.body;

    Shop.find({name: shopData.name})
        .then(shops => {
            if (shops.length) {
                next(new Error(`Имя ${shopData.name} уже используется!`));
            }
            else {
                const newShop = new Shop(shopData);

                newShop.validate((err) => {
                    if (err) {
                        next(new Error('Неверно заполненные поля!'));
                    }
                    else {
                        newShop.save()
                            .then(shop => {
                                res.send(shop)
                            })
                            .catch(err => next(err));
                    }
                });

            }
        })
        .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {

    Shop.findById(req.params.id)
        .then(shop => {
            if (!shop) {
                next(new Error(`Магазин с id: ${req.params.id} не найден!`));
            }
            else {
                res.send(shop);
            }
        })
        .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
    const updatedShop = req.body;

    Shop.findByIdAndUpdate(req.params.id, updatedShop, {new: true})
        .then(shop => {
            res.send(shop);
        })
        .catch(err => next(err));

});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    Shop.findOneAndRemove({_id: id})
        .then(() => res.send(id))
        .catch(err => next(err));

});

router.get('/:id/statistics', (req, res, next) => {
    Shop.findById(req.params.id)
        .then(shop => {
            if (!shop) {
                next(new Error(`Магазин с id: ${req.params.id} не найден!`));
            }
            else {
                Promise.all([
                    Product.count({provider: {$in: shop.providers}}),
                    Order.count({provider: {$in: shop.providers}})
                ])
                    .then(result => {
                        const statistics = {
                            productsCount: result[0],
                            ordersCount: result[1]
                        };
                        res.send(statistics);

                    })
                    .catch(error => next(error))
            }
        })
        .catch(err => next(err));

});

router.get('/:id/save-price', (req, res, next) => {
    const id = req.params.id;

    res.set({
        'Content-Disposition': 'attachment; filename="price.xlsx"',
        'Content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    Shop.findById(id)
        .then(shop => {
            Product.find({provider: {$in: shop.providers}})
                .populate('provider')
                .then(products => {
                    const productsForSave = products
                        .filter(product => product.isDone && product.available === '+')
                        .map(product => {
                            let group = shop.groups.find(group => {
                                return group.name === product.category.name
                            });

                            product.vendorCode = `${product.vendorCode}-${product.provider.prefix}`;
                            product.groupId = group.id ? group.id : '';
                            return product
                        });

                    writeExcel(productsForSave, res);
                });
        })
        .catch(err => next(err));
});


export default router;
