import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import { CreateUserDto } from '../dto/createUserDto';
import { UpdateUserDto } from '../dto/UpdateUserDto';
import { UsersRepostiory } from './interfaces/users.interfaces';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Inject } from '@nestjs/common';
import { DYNAMO_DB } from 'src/database/database.module';

export class DynamoUsersRepository implements UsersRepostiory {
  constructor(
    @Inject(DYNAMO_DB)
    private readonly dynamoDb: DynamoDBDocumentClient,
  ) {}

  async findById(id: string): Promise<User | null> {
    const params = {
      TableName: 'users',
      Key: {
        PK: `USER#${id}`,
      },
    };

    const command = new GetCommand(params);

    const result = await this.dynamoDb.send(command);

    return result;
  }
  async findByEmail(email: string) {
    const params = {
      TableName: 'users',
      Key: {
        email: email,
      },
    };

    const command = new GetCommand(params);
    const result = await this.dynamoDb.send(command);

    return result;
  }
  async createUser(user: CreateUserDto) {
    throw new Error('Method not implemented.');
  }
  async updateUser(id: string, data: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }
}
