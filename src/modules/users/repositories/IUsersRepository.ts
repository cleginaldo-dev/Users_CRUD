import { User } from "../../../entities/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface IListAllParams {
  name?: string;
  initial_date?: Date;
  final_date?: Date;
}
export interface IListAllReturn {
  total: number;
  data: User[];
}

interface IUsersRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<User>;
  list(params?: IListAllParams): Promise<IListAllReturn>;
  delete(id: string): Promise<number> | undefined;
}
export { IUsersRepository, ICreateUserDTO };
