import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";
import { User } from "src/users";

@Exclude()
export class LoginDto implements Partial<User>  {
    @Expose()
    @IsString()
    username: string

    @Expose()
    @IsString()
    password: string
}