import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    treeData: Object,
    userId: mongoose.SchemaTypes.ObjectId
},
{
    timestamps: true
})