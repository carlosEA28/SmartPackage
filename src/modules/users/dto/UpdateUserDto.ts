import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUserDto';

// o partialType e uma func que cria uma classe que extende os atributos de outra classe, mantendo os atributos como opcionais
export class UpdateUserDto extends PartialType(CreateUserDto) {}
