import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '~/auth/auth.module'
import { Photo } from '~/database/photo.entity'
import { User } from '~/database/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User, Photo])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
