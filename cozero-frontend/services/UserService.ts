import { UserLoginDTO, UserRegistrationDTO } from "../interfaces/user.dto";
import HTTPService from "./HTTPService";

class UserService {
    public async register(user: UserRegistrationDTO) {
        return HTTPService.post<UserLoginDTO>('users/sign-up', user);
    }

    public async login(user: UserRegistrationDTO) {
        debugger;
        return  HTTPService.post<UserLoginDTO>('auth/login', user);

    }

}

export default new UserService();