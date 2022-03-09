import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserCredentialsDto } from './dto/user-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) userCredentialsDto: UserCredentialsDto,
  ): Promise<void> {
    return this.userService.signUp(userCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) userCredentialsDto: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(userCredentialsDto);
  }

  @Get('/')
  @UseGuards(AuthGuard())
  getUser(@GetUser() user: User): User {
    return user;
  }
}
