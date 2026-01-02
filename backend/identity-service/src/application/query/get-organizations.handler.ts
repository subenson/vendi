import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetOrganizationsQuery } from './get-organizations.query';
import { Membership } from '../../domain/model/membership.model';
import { Organization } from '../../domain/model/organization.model';

@QueryHandler(GetOrganizationsQuery)
export class GetOrganizationsQueryHandler
  implements IQueryHandler<GetOrganizationsQuery>
{
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
  ) {}

  async execute(query: GetOrganizationsQuery): Promise<Organization[]> {
    const memberships = await this.membershipRepository.find({
      where: { userId: query.userId },
      relations: ['organization'],
    });

    return memberships.map((m) => m.organization);
  }
}
