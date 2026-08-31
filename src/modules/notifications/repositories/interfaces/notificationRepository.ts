import { Notification, NotificationStatus } from 'generated/prisma/client';
import { CreateNotificationDto } from 'src/modules/notifications/dto/CreateNotificationDto';

export const NOTIFICATION_REPOSITORY = Symbol('NOTIFICATION_REPOSITORY');

export interface NotificationRepository {
  findById(id: string): Promise<Notification | null>;
  findByPackageId(packageId: string): Promise<Notification[]>;
  create(data: CreateNotificationDto): Promise<Notification>;
  updateStatus(id: string, status: NotificationStatus): Promise<Notification>;
}
