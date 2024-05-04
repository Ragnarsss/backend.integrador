import { Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async users() {
    try {
      const foundUsers = await this.userService.findAll();
      return {
        success: true,
        message: 'Users found',
        data: foundUsers,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to found users',
        error: (error as Record<string, string>)?.message,
      };
    }
  }
}
