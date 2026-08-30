import { Module } from '@nestjs/common';
import { ApartmentsController } from './controllers/apartments.controller';
import { ApartmentsService } from './services/apartments.service';
import { PrismaApartmentsRepository } from './repositories/implementations/PrismaApartmentsRepository';
import { APARTMENTS_REPOSITORY } from './repositories/interfaces/ApartmentsRepository';

@Module({
  controllers: [ApartmentsController],
  providers: [
    ApartmentsService,
    {
      provide: APARTMENTS_REPOSITORY,
      useClass: PrismaApartmentsRepository,
    },
  ],
  exports: [ApartmentsService],
})
export class ApartmentsModule {}
