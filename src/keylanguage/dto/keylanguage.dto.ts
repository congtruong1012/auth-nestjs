import { IsString } from "class-validator";

export class KeyLanguageDTO {
    @IsString({message: "key không phải kiểu string"})
    readonly key: string;
    
    @IsString({message: "Value không phải kiểu string"})
    readonly value: string;

}