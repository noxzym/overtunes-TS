import mongoose from "mongoose";
import * as config from './../../config.json';

export = mongoose.model('Guild', new mongoose.Schema({
    id: { type: String },
    prefix: { type: String, default: config.prefix }
}));
