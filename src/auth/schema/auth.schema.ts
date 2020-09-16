import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
},
{
    timestamps: true
})