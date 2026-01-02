import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { Command } from '@nestjs/cqrs';

export class CreateOrganizationCommand extends Command<{
  organizationId: string;
}> {
  name: string;
  referenceId: string;
  userId: string;

  constructor(
    public readonly dto: CreateOrganizationDto,
    userId: string,
  ) {
    super();
    this.name = dto.name;
    this.referenceId = dto.referenceId;
    this.userId = userId;
  }
}
