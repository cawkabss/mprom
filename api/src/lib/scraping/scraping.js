import cheerio from 'cheerio';
import needle from 'needle';

export const getPage = (url, cookie) => {
    const options = {
        follow_max: 5,
        cookies: {
            ccc: cookie
        }
    };

    return new Promise((resolve, reject) => {
        needle.get(url, options, (err, res) => {
            //if (err) throw err;
            //console.log(url);
            if (err) {
                console.log('errr1', url);
                needle.get(url, options, (err, res) => {
                    if (err) console.log('errr2', url);


                    resolve(cheerio.load(res.body))
                });
            }
            else {
                resolve(cheerio.load(res.body))
            }

        });
    });
};

export const getProductsUrl = ($) => {
    let urls = [];
    let ProductsList = $('.x-catalog-gallery__list .x-gallery-tile__content > a.x-gallery-tile__image-holder.x-image-holder');
    ProductsList.each((i, e) => {
        urls.push($(e).attr('href'));
    });

    return Promise.resolve(urls);
};

export const getProductsList = (urls, cookie, maxCount, timeOut) => {
    urls.length = urls.length > maxCount ? maxCount : urls.length;
    let productsList = urls.map((url, i) => getProductDetail(url, i, cookie, timeOut));
    return Promise.all(productsList);
};

const getProductDetail = (url, i, cookie, timeOut) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            getPage(url, cookie).then($ => {
                const product = {
                    title: getProductTitle($),
                    price: getProductPrice($),
                    images: getProductImages($),
                    description: {
                        html: getProductDescriptionHTML($) ? getProductDescriptionHTML($).trim() : null,
                        text: getProductDescriptionText($) ? getProductDescriptionText($).trim() : null
                    },
                    properties: getProductProps($),
                    keywords: getProductKeywords($),
                    category: getProductCategory($)
                };
                resolve(product);
            })
        }, timeOut * 1000 * i)
    })
};

const getProductTitle = ($) => {
    return $('.x-product-info__content > h1').text();
};
const getProductPrice = ($) => {
    let price = +$('.x-product-price__value span[itemprop="price"]').text();
    return Math.ceil(price);
};
const getProductImages = ($) => {
    const images = [];
    if ($('.x-product-images__list.js-product-images__list li').length) {
        $('.x-product-images__thumb.js-product-images__thumb')
            .each((i, e) => images.push($(e).attr('data-big-image-src')));
    } else {
        images.push($('.x-product-images__main-holder.js-product-images__main_image_holder img').attr('src'))
    }
    return images;
};

const getProductProps = ($) => {
    let props = [];

    $('.x-attributes__row.js-attributes[data-qaid="attribute_line"]').each((i, e) => {
        let prop = {
            key: $(e).find('.x-attributes__left .x-attributes__value')
                .first().contents().filter(function () {
                    return this.type === 'text';
                }).text(),
            value: $(e).find('.x-attributes__right .x-attributes__value').text()
        };
        props.push(prop);
    });
    return props;
};

const getProductDescriptionHTML = ($) => {

    $('div[data-qaid="product_description"] a').each(function () {
        $(this).replaceWith($(this).html());
    });

    return $('div[data-qaid="product_description"]').html();
};

const getProductDescriptionText = ($) => {

    return $('div[data-qaid="product_description"]').text();
};

const getProductKeywords = ($) => {
    return $('meta[name="keywords"]').attr('content')
};

const getProductCategory = ($) => {
    let category = $('div.x-breadcrumb div.x-breadcrumb__item a').eq(-2);

    return {
        url: `https://prom.ua${category.attr('href')}`,
        name: category.text()
    }
};