import {
  IListAllReturn,
  IUsersRepository,
} from "../../repositories/IUsersRepository";

export interface IRequest {
  name?: string;
  initial_date?: Date;
  final_date?: Date;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    name,
    initial_date,
    final_date,
  }: IRequest): Promise<IListAllReturn> {
    const allUsers = await this.usersRepository.list({
      name,
      initial_date,
      final_date,
    });
    return allUsers;
  }
}
export { ListAllUsersUseCase };
