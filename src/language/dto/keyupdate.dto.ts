import { IsString } from "class-validator";

export class KeyUpdate{
    @IsString({message: 'KeyOld không phải kiểu string'})
    readonly keyOld: string;
    @IsString({message: 'KeyNew không phải kiểu string'})
    readonly keyNew: string;
}