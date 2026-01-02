import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Membership } from './membership.model';

@Entity('organizations')
export class Organization {
  static readonly prefix = 'org';

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  referenceId: string;

  @Exclude()
  @Column()
  createdBy: string;

  @OneToMany(() => Membership, (membership) => membership.organization)
  memberships: Membership[];

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
    id: string,
    name: string,
    referenceId: string,
    createdBy: string,
  ): Organization {
    const organization = new Organization();
    organization.id = id;
    organization.name = name;
    organization.referenceId = referenceId;
    organization.createdBy = createdBy;
    return organization;
  }
}
