import { MapperPickType } from "@automapper/classes/mapped-types";
import { User} from '../../schemas/user.schema';

export class JwtUser extends MapperPickType(User, ['id', 'name']) {}