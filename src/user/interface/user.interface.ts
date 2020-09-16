import { Document } from "mongoose";

export class User extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string
}