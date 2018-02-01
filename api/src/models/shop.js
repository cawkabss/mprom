import mongoose from '../lib/mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    groups: [{
        name: String,
        id: String
    }],

    providers: [{
        type: Schema.ObjectId,
        ref: 'Provider'
    }],

    canSavePrice: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Shop', schema);
