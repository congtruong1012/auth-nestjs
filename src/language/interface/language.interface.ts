/* eslint-disable @typescript-eslint/ban-types */
import { Document } from "mongoose";

export class Language extends Document{
    key: string;
    value: string;
    message: object;
    userId: string;
    projectId: string;
}