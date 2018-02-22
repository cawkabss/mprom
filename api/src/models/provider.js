import mongoose from '../lib/mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    url: {
        type: String,
        required: true
    },

    prefix: {
        type: String,
        required: true,
        unique: true
    },

    settings: {
        titleCell: {
            type: String,
            required: true
        },

        vendorCodeCell: {
            type: String,
            required: true
        },

        priceCell: {
            type: String,
            required: true
        },

        recommendedPriceCell: {
            type: String
        },

        descriptionCell: {
            type: String
        },

        countCell: {
            type: String
        }
    },

    priceRange: {
        type: Array
    },

    categories: {
        type: Array,
        default: []
    },

    updateTime: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Provider', schema);
