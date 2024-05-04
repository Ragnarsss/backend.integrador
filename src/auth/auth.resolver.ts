import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/dto/auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async login(@Args('authData') authData: AuthDto) {
    const response = await this.authService.login(authData);
    return response;
  }
}
