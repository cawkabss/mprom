import exceljs from "exceljs";

const readExcel = (file, options, priceRange) => {

    const workbook = new exceljs.Workbook();
    return workbook.xlsx.read(file)
        .then(() => {

            const worksheet = workbook.getWorksheet(1);
            let productsForPars = [];

            worksheet.eachRow(function (row, rowNumber) {
                const vendorCode = row.getCell(options.vendorCodeCell).value;
                const title = row.getCell(options.titleCell).value;
                const price = Math.ceil(row.getCell(options.priceCell).value);
                const description = {
                    html: options.descriptionCell ?
                        row.getCell(options.descriptionCell).value : 'Описание готовится!',
                    text: options.descriptionCell ?
                        row.getCell(options.descriptionCell).value : 'Описание готовится!'
                };
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
                        for(let i = 0; i < priceRange.length; i++) {
                            if(price >= priceRange[i].from && price < priceRange[i].to) {

                                ourPrice = price * (priceRange[i].percentage + 100) / 100;
                                break;
                            }
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