import { Body, Controller, Request, Get, Param, ParseIntPipe, Post, UseGuards, Inject } from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { AuthService } from '~/auth/auth.service'
import { Repository } from 'typeorm'
import { Photo } from '~/database/photo.entity'
import { User } from '~/database/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userRepository.find()
  }

  @Get('g/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return id + 1
  }

  @Post('v')
  createUser(@Body() b) {
    const user = new User()
    user.password = b.password
    user.username = b.username
    this.userRepository.save(user)
    return b
  }

  @Post('auth/login')
  async login(@Body() user) {
    console.log(user)
    return this.authService.login(user)
  }
}
