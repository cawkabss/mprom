import express from 'express';

import Order from '../models/order';
import Provider from "../models/provider";
import Product from "../models/product";

const router = express.Router();


router.get('/', (req, res, next) => {
    Order.find()
        .populate({
            path: 'product',
            model: 'Product',
            populate: {
                path: 'provider',
                model: 'Provider'
            }
        })
        .sort('-createTime')
        .then(orders => res.send(orders))
        .catch(err => next(err));
});

router.post('/', (req, res, next) => {
    const orderData = req.body;
    const newOrder = new Order(orderData);

    newOrder.save()
        .then(order => {
            Product.findByIdAndUpdate(order.product, {$push: {orders: order._id}})
                .then(() => res.send(order))
        })
        .catch(err => next(err));
});

router.put('/', (req, res, next) => {
    let updatedOrders = req.body;

    updatedOrders = updatedOrders.map(order => {
        return {
            updateOne:
                {
                    "filter": {"_id": order._id},
                    "update": {
                        $set: {
                            "status": order.status
                        }
                    }
                }
        }
    });

    Order.bulkWrite([
        ...updatedOrders
    ])
        .then(() => res.end())
        .catch(error => next(error))
});

router.put('/delete', (req, res, next) => {
    let deletedOrders = req.body;

    deletedOrders = deletedOrders.map(order => {
        return {
            deleteOne: {
                filter: {_id: order._id}
            }
        }
    });

    Order.bulkWrite([
        ...deletedOrders
    ])
        .then(() => res.end())
        .catch(error => next(error))
});

router.get('/filter', (req, res, next) => {
    const settings = JSON.parse(req.query.settings);
    Order.find({
        "createTime": {
            "$gte": new Date(settings.minDate),
            "$lt": new Date(settings.maxDate)
        }
    })
        .populate({
            path: 'product',
            model: 'Product',
            populate: {
                path: 'provider',
                model: 'Provider'
            }
        })
        .then(orders => {
            return orders.filter(order => {
                return (
                    checkByProvider(settings.providers, order) &&
                    checkByPaidMethod(settings.paidMethods, order) &&
                    checkByDeliveryMethod(settings.deliveryMethods, order)
                );
            })
                .sort((a , b) => a.createTime - b.createTime);
        })
        .then(orders => res.send(orders))
        .catch(err => next(err));
});

router.get('/statistics/year', (req, res, next) => {
    const nowDate = new Date();
    const currentMonth = nowDate.getMonth();
    const currentYear = nowDate.getFullYear();
    const result = [];

    for(let i = 0; i < 12; i++) {
        const start = new Date(currentYear, currentMonth - i, 1);
        const end = new Date(currentYear, currentMonth - i + 1, 0);

        const count = Order.count({
            "createTime": {
                "$gte": start,
                "$lt": end
            }
        })
            .then(count => {
                const transformed = monthlySales.find(i => i.index === start.getMonth());
                transformed.orders = count;
                return transformed;
            });
        result.push(count);
    }

    Promise.all(result)
        .then(result => res.send(result));

});

router.get('/statistics/month', (req, res, next) => {
    const nowDate = new Date();
    const currentMonth = nowDate.getMonth();
    const currentYear = nowDate.getFullYear();
    const currentDate = nowDate.getDate();
    const result = [];

    for(let i = currentDate; i > 0; i--) {
        const start = new Date(currentYear, currentMonth, i, 0, 0, 0);
        const end = new Date(currentYear, currentMonth, i, 23, 59, 59);

        const count = Order.count({
            "createTime": {
                "$gte": start,
                "$lt": end
            }
        })
            .then(count => {
                return {
                    day: start.getDate(),
                    orders: count
                }
            });
        result.push(count);
    }

    Promise.all(result)
        .then(result => res.send(result));

});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    Order.findById(id)
        .then(order => {
            if (!order) {
                next(new Error(`Заказ с id: ${req.params.id} не найден!`));
            }
            else {
                res.send(order);
            }
        })
        .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
    const updatedOrder = req.body;

    Order.findByIdAndUpdate(req.params.id, updatedOrder, {new: true})
        .then(order => res.send(order))
        .catch(err => next(err));

});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    Provider.findOneAndRemove({_id: id})
        .then(res.end)
        .catch(err => next(err));

});

const monthlySales = [
    {name: 'Янв', index: 0, orders: 0},
    {name: 'Фев', index: 1, orders: 0},
    {name: 'Мрт.', index: 2, orders: 0},
    {name: 'Апр', index: 3, orders: 0},
    {name: 'Май', index: 4, orders: 0},
    {name: 'Июн', index: 5, orders: 0},
    {name: 'Июл', index: 6, orders: 0},
    {name: 'Авг', index: 7, orders: 0},
    {name: 'Сен', index: 8, orders: 0},
    {name: 'Окт', index: 9, orders: 0},
    {name: 'Нбр', index: 10, orders: 0},
    {name: 'Дек', index: 11, orders: 0}
];

const checkByProvider = (providers, order) => (
    !providers.length ||
    providers.findIndex(providerName => providerName === order.product.provider.name) > -1
);

const checkByPaidMethod = (methods, order) => (
    !methods.length ||
    methods.findIndex(method => method === order.data.paidMethod) > -1
);

const checkByDeliveryMethod = (methods, order) => (
    !methods.length ||
    methods.findIndex(method => method === order.data.deliveryMethod) > -1
);

export default router;
