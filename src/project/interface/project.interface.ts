import { Document } from "mongoose";

/* eslint-disable @typescript-eslint/ban-types */
export class Project extends Document {
     name: string;
    description: string;
    treeData: object;
    userId?: string
}