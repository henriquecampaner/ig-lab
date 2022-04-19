import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/databse/database.module';
import path from 'node:path';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { CoursesServices } from 'src/services/courses.service';
import { StudentsServices } from 'src/services/students.service';
import { EnrollmentsServices } from 'src/services/enrollments.service';

@Module({
  providers: [
    // Resolvers
    CoursesResolver,
    StudentsResolver,
    EnrollmentsResolver,

    // Services
    CoursesServices,
    StudentsServices,
    EnrollmentsServices,
  ],
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloFederationDriver,
    }),
  ],
})
export class HttpModule {}
