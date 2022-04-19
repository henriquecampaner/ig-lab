import { Module } from '@nestjs/common';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
        context: ({ req }) => {
          return {
            headers: req.headers,
          };
        },
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'purchases',
              url: 'http://localhost:3003/graphql',
            },
            {
              name: 'classroom',
              url: 'http://localhost:3002/graphql',
            },
          ],
        }),
        buildService: ({ url }) => {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set(
                'authorization',
                context?.['headers']?.['authorization'],
              );
            },
          });
        },
      },
    }),
  ],
})
export class AppModule {}
