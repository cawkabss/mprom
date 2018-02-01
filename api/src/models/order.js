import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({

    data: {
        customerName: {
            type: String,
            required: true
        },
        customerPhone: {
            type: String,
            required: true
        },
        customerEmail: {
            type: String
        },
        deliveryMethod: {
            type: String,
            required: true
        },
        paidMethod: {
            type: String,
            required: true
        },
        orderNumber: {
            type: String,
            required: true
        }
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    provider: {
        type: Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },

    status: {
        type: String,
        default: 'Невыполнен'
    },

    createTime: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Order', schema);