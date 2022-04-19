import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import path from 'node:path';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { CustomersService } from 'src/services/customers.service';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  providers: [
    // Services
    ProductsService,
    PurchasesService,
    CustomersService,
    // Resolvers
    ProductsResolver,
    PurchasesResolver,
    CustomersResolver,
  ],
  imports: [
    MessagingModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloFederationDriver,
    }),
  ],
})
export class HttpModule {}
