import { Module } from '@nestjs/common';
import { NotificationsController } from './controller/notifications.controller';
import { NotificationsService } from './services/notifications.service';
import { NOTIFICATION_REPOSITORY } from './repositories/interfaces/notificationRepository';
import { PrismaNotificationRepository } from './repositories/implementations/prismaNotificationRepository';

@Module({
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    {
      provide: NOTIFICATION_REPOSITORY,
      useClass: PrismaNotificationRepository,
    },
  ],
})
export class NotificationsModule {}
