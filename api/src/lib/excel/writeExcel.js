import exceljs from 'exceljs';

const writeExcel = (products, res) => {

    let workbook = new exceljs.Workbook();
    let worksheet = workbook.addWorksheet('My Sheet');

    let countsOfAllProperties = products.map(product => product.properties ? product.properties.length : 0);
    let maxCountOfProperties = Math.max(...countsOfAllProperties);

    let props = [];
    for(let i = 0; i < maxCountOfProperties; i++) {
        props.push('Название_Характеристики');
        props.push('Измерение_Характеристики');
        props.push('Значение_Характеристики');
    }

    worksheet.addRow([
        'Код_товара',
        'Название_позиции',
        'Ключевые_слова',
        'Описание',
        'Тип_товара',
        'Цена',
        'Валюта',
        'Единица_измерения',
        'Минимальный_объем_заказа',
        'Оптовая_цена',
        'Минимальный_заказ_опт',
        'Ссылка_изображения',
        'Наличие',
        'Количество',
        'Номер_группы',
        'Название_группы',
        'Адрес_подраздела',
        'Возможность_поставки',
        'Срок_поставки',
        'Способ_упаковки',
        'Уникальный_идентификатор',
        'Идентификатор_товара',
        'Идентификатор_подраздела',
        'Идентификатор_группы',
        'Производитель',
        'Гарантийный_срок',
        'Страна_производитель',
        'Скидка',
        'ID_группы_разновидностей',
        'Метки'
    ].concat(props));

    for (let i = 0; i < products.length; i++) {
        let props = [];

        if(products[i].properties){
            products[i].properties.forEach(el => {
                props.push(el.key.replace(/^\s+|\s+$/g, ""));
                props.push("");
                props.push(el.value.replace(/^\s+|\s+$/g, ""));
            });

        }

        worksheet.addRow([
            products[i].vendorCode,
            products[i].title,
            products[i].keywords,
            products[i].description.html.replace(/^\s+|\s+$/g, ""),
            'r',
            products[i].price.ourPrice,
            'UAH',
            'шт.',
            '',
            '',
            '',
            products[i].images.join(','),
            products[i].available,
            products[i].count ? products[i].count : '',
            products[i].groupId,
            '',
            products[i].category ? products[i].category.url : '',
            '',
            '',
            '',
            '',
            products[i].vendorCode.replace(/\s/g, ''),
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            ''].concat(props));

    }
    workbook.xlsx.write(res)
        .then(function () {
            res.end();
        });
};

export default writeExcel;