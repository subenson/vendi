import { Query } from '@nestjs/cqrs';
import { Organization } from '../../domain/model/organization.model';

export class GetOrganizationsQuery extends Query<Organization[]> {
  userId: string;

  constructor(userId: string) {
    super();
    this.userId = userId;
  }
}
