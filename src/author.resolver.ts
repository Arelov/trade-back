import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Author } from './author.model'

@Resolver((of) => Author)
export class AuthorsResolver {
  @Query((returns) => Author)
  async author(@Args('id', { type: () => Int }) id: number) {
    return { firstName: 'dssdad' }
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    return ['dssdad', '1232313']
  }
}
