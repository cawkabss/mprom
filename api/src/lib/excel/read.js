import exceljs from "exceljs";

const readExcel = (file, options) => {

    const workbook = new exceljs.Workbook();
    return workbook.xlsx.read(file)
        .then(() => {

            const worksheet = workbook.getWorksheet(1);
            let productsForPars = [];

            worksheet.eachRow(function (row, rowNumber) {
                const vendorCode = row.getCell(options.vendorCodeCell).value;
                const title = row.getCell(options.titleCell).value;
                const price = Math.ceil(row.getCell(options.priceCell).value);
                const description = options.descriptionCell ?
                    row.getCell(options.descriptionCell).value : 'Описание готовится!';
                const count = options.countCell ?
                    parseInt(row.getCell(options.countCell).value) : '';
                const recommendedPrice = options.recommendedPriceCell ?
                    Math.ceil(row.getCell(options.recommendedPriceCell).value) : '';

                if (isNaN(price) || isNaN(recommendedPrice) || isNaN(count)) {
                    throw new Error(`Товар - ${vendorCode}.
                        Значения в ячейках с ценой, рекомендованной ценой и остатками должны быть числами! Исправьте значения в файле или измените конфигурацию прайс-листа в разделе "Изменить".
                    `);
                }

                if (vendorCode && title && price) {

                    let ourPrice = 0;
                    let markup = 0;

                    if (recommendedPrice) {
                        ourPrice = recommendedPrice;
                    }
                    else {
                        if (price < 50) {
                            ourPrice = price * 2;
                        } else if (price >= 50 && price < 100) {
                            ourPrice = price + 40;
                        } else if (price >= 100 && price < 200) {
                            ourPrice = price + 50;
                        } else if (price >= 200 && price < 300) {
                            ourPrice = price * 1.25;
                        } else if (price >= 300 && price < 400) {
                            ourPrice = price * 1.24;
                        } else if (price >= 400 && price < 500) {
                            ourPrice = price * 1.23;
                        } else if (price >= 500 && price < 600) {
                            ourPrice = price * 1.22;
                        } else if (price >= 600 && price < 700) {
                            ourPrice = price * 1.21;
                        } else if (price >= 700 && price < 800) {
                            ourPrice = price * 1.20;
                        } else if (price >= 800 && price < 900) {
                            ourPrice = price * 1.19;
                        } else if (price >= 900 && price < 1000) {
                            ourPrice = price * 1.18;
                        } else if (price >= 1000 && price < 1100) {
                            ourPrice = price * 1.17;
                        } else if (price >= 1100 && price < 1200) {
                            ourPrice = price * 1.16;
                        } else if (price >= 1200 && price < 1300) {
                            ourPrice = price * 1.15;
                        }
                        else if (price >= 1300) {
                            ourPrice = price * 1.2;
                        }
                    }

                    ourPrice = Math.ceil(ourPrice);
                    productsForPars[rowNumber] = {
                        vendorCode: vendorCode.toString(),
                        title,
                        description,
                        count,
                        errors: false,
                        price: {
                            providerPrice: price,
                            ourPrice: ourPrice,
                            recommendedPrice: recommendedPrice,
                            markup: ourPrice - price

                        }
                    };

                }
            });

            return productsForPars.filter((el, index, arr) => {

                    return index === arr.findIndex(t => {
                        return t !== undefined && t.vendorCode === el.vendorCode
                    });
                }
            );

        })
};

export default readExcel;