import * as mongoose from 'mongoose';

export const KeyLanguageSchema = new mongoose.Schema({
    key: String,
    value: String,
},
{
    timestamps: true
})