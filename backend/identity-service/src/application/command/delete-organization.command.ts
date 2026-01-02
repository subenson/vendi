import { Command } from '@nestjs/cqrs';

export class DeleteOrganizationCommand extends Command<void> {
  organizationId: string;
  userId: string;

  constructor(organizationId: string, userId: string) {
    super();
    this.organizationId = organizationId;
    this.userId = userId;
  }
}
