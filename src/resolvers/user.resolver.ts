import { Arg, Mutation, Query, Resolver, Int } from 'type-graphql';
import { User } from '../entities';
import { UserService } from '../services';
import { UserInput } from './types';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User)
  async findUser(@Arg('userId', type => Int) id: number): Promise<User> {
    const res = await this.userService.findById(id);
    return res;
  }

  @Mutation(returns => User)
  async saveUser(@Arg('user') input: UserInput): Promise<User> {
    const user = await this.userService.save(input);
    return user;
  }
}
