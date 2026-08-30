import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
export const DYNAMO_DB = Symbol('DYNAMO_DB');

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DYNAMO_DB,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const client = new DynamoDBClient({
          region: configService.getOrThrow<string>('AWS_REGION'),
        });

        const result = await client.send(new ListTablesCommand({}));

        console.log('DynamoDB conectado!');
        console.log('Tabelas:', result.TableNames);

        return DynamoDBDocumentClient.from(client);
      },
    },
  ],
  exports: [DYNAMO_DB],
})
export class DatabaseModule {}
