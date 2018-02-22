import express from 'express';
// var request = require('request');
// var Client = require('Instagram-private-api').V1;
// var device = new Client.Device('cawkabss');
// var storage = new Client.CookieFileStorage(__dirname + '../../cookies/cawkabss.json');
// import Product from '../models/product';

const router = express.Router();

// const post = () => {
//     Product.find({isDone: true })
//         .then(products => {
// const product = products[Math.ceil(Math.random() * products.length - 1)];
//             Client.Session.create(device, storage, 'cawkabss', 'q19920412')
//                 .then(function(session) {
//                     let description = product.description
//                         .replace(/&#(\d+);/g, function (match, num) {
//                             return String.fromCharCode(num);
//                         })
//                         .replace(/&#x([A-Za-z0-9]+);/g, function (match, num) {
//                             return String.fromCharCode(parseInt(num, 16));
//                         })
//                         .trim();
//
//                     if (product.images.length > 1) {
//                         const images = product.images.map(img => (
//                             {
//                                 type: 'photo',
//                                 size: [400, 400],
//                                 data: request.get(img)
//                             }
//                         ));
//                         Client.Upload.album(session, images)
//                             .then(function (payload) {
//                                 description = description.length > 2200 ? description.slice(100) + '...' :
//                                     description;
//
//                                 Client.Media.configureAlbum(session, payload, description)
//                             })
//                             .then(function () {
//                                 // we configure album
//                                 console.log('done')
//                             })
//                     }
//                     else {
//                         const image = request.get(product.images[0]);
//
//                         Client.Upload.photo(session, image)
//                             .then(function(upload) {
//                                 // upload instanceof Client.Upload
//                                 // nothing more than just keeping upload id
//                                 console.log(upload.params.uploadId);
//                                 return Client.Media.configurePhoto(session, upload.params.uploadId, description);
//                             })
//                             .then(function(medium) {
//                                 // we configure medium, it is now visible with caption
//                                 console.log(medium.params)
//                             })
//                     }
//
//                 });
//
//
//
//
//
//
//
//         });
// };

router.get('/', (req, res, next) => {

});


export default router;