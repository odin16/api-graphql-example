import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../entities';
import { UserInput } from '../resolvers/types';
import { ResolverError } from '../shared';

@Service()
export class UserService {
  @InjectRepository(User) private readonly userRepository: Repository<User>;

  constructor() {}

  async findById(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new ResolverError({
          message: `User with id: <${id}> not found.`,
          statusCode: 404,
        });
      }

      return user;
    } catch (err) {
      if (err.name === 'ResolverError') throw err;
      throw new ResolverError({
        debugMessage: `[UserService]: Error when consulting the user: "${id}".`,
        error: err,
      });
    }
  }

  async save(input: UserInput): Promise<User> {
    try {
      const user = this.userRepository.create(input);
      return await this.userRepository.save(user);
    } catch (err) {
      throw new ResolverError({
        debugMessage: '[UserService]: Error creating the user',
        error: err,
      });
    }
  }
}
