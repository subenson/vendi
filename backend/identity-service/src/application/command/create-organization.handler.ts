import { CommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { CreateOrganizationCommand } from './create-organization.command';
import { Organization } from '../../domain/model/organization.model';
import { Membership } from '../../domain/model/membership.model';
import { MembershipRole } from '../../domain/model/membership-role.enum';
import { PrefixedUlid } from '@vendi/core';

@CommandHandler(CreateOrganizationCommand)
export class CreateOrganizationHandler {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
  ) {}

  async execute(
    command: CreateOrganizationCommand,
  ): Promise<{ organizationId: string }> {
    const existingOrg = await this.organizationRepository.findOne({
      where: { referenceId: command.referenceId },
    });

    if (existingOrg) {
      throw new ConflictException(
        'An organization with this referenceId already exists',
      );
    }

    const organizationId = PrefixedUlid.create(Organization.prefix);

    const organization = Organization.create(
      organizationId,
      command.name,
      command.referenceId,
      command.userId,
    );

    await this.organizationRepository.save(organization);

    const membership = Membership.create(
      organizationId,
      command.userId,
      MembershipRole.OWNER,
    );

    await this.membershipRepository.save(membership);

    return { organizationId };
  }
}
