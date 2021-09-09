import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Photo } from './database/photo.entity'
import { User } from '~/database/user.entity'
import { GraphQLModule } from '@nestjs/graphql'
import { TestResolver } from './test/test.resolver'
import { AuthorsResolver } from './author.resolver'

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'test1',
      entities: [Photo, User],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      context: ({ req }) => {
        return { request: req }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthorsResolver, TestResolver],
})
export class AppModule {}
