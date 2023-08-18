import { Exclude, Expose } from "class-transformer";
import { LoginDto } from "./login.dto";
import { Match } from "src/common";
import { IsString, MaxLength, MinLength } from "class-validator";

@Exclude()
export class RegisterDto extends LoginDto {
    @Expose()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string

    @Expose()
    @Match("password")
    passwordConfirm: string
}