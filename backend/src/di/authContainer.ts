import { IGetCurrentUser } from "../application/interface/use-cases/IGetCurrentUser";
import { ILoginUser } from "../application/interface/use-cases/ILoginUser";
import { ILogout } from "../application/interface/use-cases/ILogout";
import { IRefreshToken } from "../application/interface/use-cases/IRefreshToken";
import { IRegisterUser } from "../application/interface/use-cases/IRegisterUser";
import { GetCurrentUser } from "../application/use-cases/auth/GetCurrentUser";
import { LoginUser } from "../application/use-cases/auth/LoginUser";
import { Logout } from "../application/use-cases/auth/Logout";
import { RefreshToken } from "../application/use-cases/auth/RefreshToken";
import { RegisterUser } from "../application/use-cases/auth/RegisterUser";
import { MongoUserRepository } from "../infrastructure/database/repositories/MongoUserRepository";
import { BcryptService } from "../infrastructure/setvice/BcryptService";
import { JWTService } from "../infrastructure/setvice/JWTService";
import { AuthController } from "../presentation/controllers/AuthController";

const userRepository=new MongoUserRepository();
const hashService=new BcryptService();
const tokenService=new JWTService();

const registerUserUseCase:IRegisterUser=new RegisterUser(userRepository,hashService);
const loginUserUseCase:ILoginUser=new LoginUser(userRepository,hashService,tokenService);
const refreshTokenUseCase:IRefreshToken=new RefreshToken(tokenService)
const logoutUseCase:ILogout=new Logout()
const getCurrentUserUsecCase:IGetCurrentUser=new GetCurrentUser(userRepository);
export const authController=new AuthController(
    registerUserUseCase,
    loginUserUseCase,
    refreshTokenUseCase,
    logoutUseCase,
    getCurrentUserUsecCase
)