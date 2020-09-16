import { IsObject, IsString } from "class-validator";

/* eslint-disable @typescript-eslint/ban-types */
export class ProjectDTO  {
    @IsString({message: "Name không phải kiểu string"})
    readonly name: string;
    
    @IsString({message: "Description không phải kiểu string"})
    readonly description: string;
    
    @IsObject({message: "TreeData không phải kiểu Object"})
    readonly treeData: object;

    @IsString({message: "userId không phải kiểu string"})
    readonly userId: string;
}