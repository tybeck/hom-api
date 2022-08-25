import {join} from 'path';
import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: true,
      sortSchema: true,
      playground: true,
      debug: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_CONNECTION_STRING,
      }),
    }),
  ],
  exports: [],
})
export class DatabaseModule {}
