import { Injectable } from '@nestjs/common';
import { Notification, NotificationStatus } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateNotificationDto } from 'src/modules/notifications/dto/CreateNotificationDto';
import { NotificationRepository } from '../interfaces/notificationRepository';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    return this.prisma.notification.findUnique({ where: { id } });
  }

  async findByPackageId(packageId: string): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: { packageId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateNotificationDto): Promise<Notification> {
    return this.prisma.notification.create({
      data: {
        packageId: data.packageId,
        recipientEmail: data.recipientEmail,
        type: data.type,
        subject: data.subject,
        status: 'PENDING',
      },
    });
  }

  async updateStatus(id: string, status: NotificationStatus): Promise<Notification> {
    return this.prisma.notification.update({
      where: { id },
      data: {
        status,
        ...(status === 'SENT' && { sentAt: new Date() }),
      },
    });
  }
}
