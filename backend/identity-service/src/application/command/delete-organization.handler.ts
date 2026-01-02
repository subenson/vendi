import { CommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException } from '@nestjs/common';
import { DeleteOrganizationCommand } from './delete-organization.command';
import { Organization } from '../../domain/model/organization.model';
import { Membership } from '../../domain/model/membership.model';
import { MembershipRole } from '../../domain/model/membership-role.enum';

@CommandHandler(DeleteOrganizationCommand)
export class DeleteOrganizationHandler {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
  ) {}

  async execute(command: DeleteOrganizationCommand): Promise<void> {
    const ownerMembership = await this.membershipRepository.findOne({
      where: {
        organizationId: command.organizationId,
        userId: command.userId,
        role: MembershipRole.OWNER,
      },
    });

    if (!ownerMembership) {
      throw new ForbiddenException(
        'Only owners can delete the organization',
      );
    }

    await this.membershipRepository.delete({
      organizationId: command.organizationId,
    });

    await this.organizationRepository.delete({ id: command.organizationId });
  }
}
