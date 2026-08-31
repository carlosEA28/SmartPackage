import { IsEnum, IsNotEmpty } from 'class-validator';
import { NotificationStatus } from 'generated/prisma/client';

export class UpdateNotificationStatusDto {
  @IsEnum(NotificationStatus)
  @IsNotEmpty()
  status: NotificationStatus;
}
