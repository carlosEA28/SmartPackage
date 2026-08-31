import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNotificationDto } from '../dto/CreateNotificationDto';
import { NOTIFICATION_REPOSITORY } from '../repositories/interfaces/notificationRepository';
import type { NotificationRepository } from '../repositories/interfaces/notificationRepository';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async findById(id: string) {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  async findByPackageId(packageId: string) {
    return this.notificationRepository.findByPackageId(packageId);
  }

  async create(data: CreateNotificationDto) {
    return this.notificationRepository.create(data);
  }

  async markAsSent(id: string) {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    if (notification.status === 'SENT') {
      throw new ConflictException('Notification already sent');
    }
    return this.notificationRepository.updateStatus(id, 'SENT');
  }

  async markAsFailed(id: string) {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    if (notification.status === 'FAILED') {
      throw new ConflictException('Notification already marked as failed');
    }
    return this.notificationRepository.updateStatus(id, 'FAILED');
  }
}
