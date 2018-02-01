import mongoose from 'mongoose';
import config from '../config';

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connection open')
});

export default mongoose;