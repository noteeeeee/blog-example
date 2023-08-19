import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";
import { User } from "src/users";

@Exclude()
export class LoginDto implements Partial<User>  {
    @Expose()
    @IsString()
    @ApiProperty()
    username: string

    @Expose()
    @IsString()
    @ApiProperty()
    password: string
}