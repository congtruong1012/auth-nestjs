import { IsObject, IsString } from "class-validator";

/* eslint-disable @typescript-eslint/ban-types */
export class LanguageDTO {
    @IsString({message: 'key không phải kiểu string'})
    readonly key : string;
    @IsString({message: 'value không phải kiểu string'})
    readonly value: string;
    @IsObject({message: 'message không phải kiểu object'})
    readonly message: object;
    @IsString({message: 'projectId không phải kiểu string'})
    readonly projectId: string;
    @IsString({message: 'userId không phải kiểu string'})
    readonly userId: string;
}