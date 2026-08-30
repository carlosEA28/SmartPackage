import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ApartmentsModule } from './apartments/apartments.module';
import { ResidentsModule } from './residents/residents.module';
import { PackagesModule } from './packages/packages.module';
import { NotificationsModule } from './notifications/notifications.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, ApartmentsModule, ResidentsModule, PackagesModule, NotificationsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
