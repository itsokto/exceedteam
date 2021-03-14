import { PickType } from "@nestjs/swagger";
import { User } from "../../schemas/user.schema";

export class LoginUser extends PickType(User, ['name', 'password']) {}