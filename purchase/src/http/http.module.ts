import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabseModule } from 'src/databse/databse.module';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import path from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { CustomersService } from 'src/services/customers.service';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';

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
    ConfigModule.forRoot(),
    DatabseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
  ],
})
export class HttpModule {}
