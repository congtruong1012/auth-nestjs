import { Document } from "mongoose";

export class KeyLanguage extends Document {
    key: string;
    value: string;
}