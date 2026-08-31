import { Module } from '@nestjs/common';
import { ApartmentsModule } from 'src/apartments/apartments.module';
import { ResidentsController } from './controllers/residents.controller';
import { PrismaResidentsRepository } from './repositories/implementations/PrismaResidentsRepository';
import { RESIDENTS_REPOSITORY } from './repositories/interfaces/ResidentsRepository';
import { ResidentsService } from './services/residents.service';

@Module({
  imports: [ApartmentsModule],
  controllers: [ResidentsController],
  providers: [
    ResidentsService,
    {
      provide: RESIDENTS_REPOSITORY,
      useClass: PrismaResidentsRepository,
    },
  ],
  exports: [ResidentsService],
})
export class ResidentsModule {}
