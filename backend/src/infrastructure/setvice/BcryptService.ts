import bcrypt from "bcryptjs";
import { IHashSevice } from "../../application/interface/services/IHashService";

export class BcryptService implements IHashSevice {
  async hash(password: string): Promise<string> {
      return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
      return await bcrypt.compare(password, hashedPassword);
  }
}