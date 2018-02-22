import mongoose from 'mongoose';
import Order from "./order";
const Schema = mongoose.Schema;

const schema = new Schema({

    title: {
        type: String,
        required: true
    },

    vendorCode: {
        type: String,
        required: true
    },

    price: {
        providerPrice: {
            type: Number,
            required: true
        },

        ourPrice: {
            type: Number,
            required: true
        },

        markup: {
            type: Number,
            required: true
        },

        recommendedPrice: {
            type: Schema.Types.Mixed
        }
    },

    available: {
        type: String,
        default: '+'
    },

    isDone: {
       type: Boolean,
        default: false
    },

    description: {
        html: {
            type: String,
            default: 'Описание готовится!'
        },
        text: {
            type: String,
            default: 'Описание готовится!'
        }

    },

    images: {
       type: [String],
        default: ['https://dummyimage.com/600x400/ccc/ffffff.png&text=фото']
    },

    category: {
        url: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: 'Без группы'
        }
    },

    keywords: {
        type: String,
        default: ''
    },

    orders: {
       type: [Schema.Types.ObjectId],
        ref: 'Order'
    },

    properties: {
        type: [
            {
                key: String,
                value: String
            }
        ],
        default: []
    },

    counts: {
        type: Schema.Types.Mixed
    },

    provider: {
        type: Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    }
});

export default mongoose.model('Product', schema);