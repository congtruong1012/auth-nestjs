import * as mongoose from 'mongoose';

export const LanguageSchema = new mongoose.Schema(
  {
    key: String,
    value: String,
    message: Object,
    userId: mongoose.SchemaTypes.ObjectId,
    projectId: mongoose.SchemaTypes.ObjectId,
  },
  {
    timestamps: true,
  },
);
