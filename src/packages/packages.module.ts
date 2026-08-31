import { Module } from '@nestjs/common';
import { PackagesController } from './controllers/packages.controller';
import { PrismaPackagesRepository } from './repositories/implementations/PrismaPackagesRepository';
import { PACKAGES_REPOSITORY } from './repositories/interfaces/PackagesRepository';
import { PackagesService } from './services/packages.service';
import { ApartmentsModule } from 'src/apartments/apartments.module';
import { ResidentsModule } from 'src/residents/residents.module';
import { USERS_REPOSITORY } from 'src/users/repository/interfaces/UsersRepository';
import { PrismaUsersRepository } from 'src/users/repository/PrismaUsersRepository';

@Module({
  imports: [ApartmentsModule, ResidentsModule],
  controllers: [PackagesController],
  providers: [
    PackagesService,
    {
      provide: PACKAGES_REPOSITORY,
      useClass: PrismaPackagesRepository,
    },
    // UsersRepository para DI
    {
      provide: USERS_REPOSITORY,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class PackagesModule {}
