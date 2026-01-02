import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Organization } from './organization.model';
import { User } from './user.model';
import { MembershipRole } from './membership-role.enum';

@Entity('memberships')
export class Membership {
  static readonly prefix = 'mem';

  @PrimaryColumn()
  organizationId: string;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => Organization, (organization) => organization.memberships)
  @JoinColumn({ name: 'organizationId' })
  organization: Organization;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: MembershipRole,
  })
  role: MembershipRole;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date | null;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date | null;

  @BeforeInsert()
  setTimestamps(): void {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  updateTimestamp(): void {
    this.updatedAt = new Date();
  }

  static create(
    organizationId: string,
    userId: string,
    role: MembershipRole,
  ): Membership {
    const membership = new Membership();
    membership.organizationId = organizationId;
    membership.userId = userId;
    membership.role = role;
    return membership;
  }
}
