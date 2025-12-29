import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  static readonly prefix = 'usr';

  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 50 })
  loginToken: string;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  loginTokenExpiresAt: Date | null;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date | null;

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

  setLoginToken(token: string, expiresAt: Date): void {
    this.loginToken = token;
    this.loginTokenExpiresAt = expiresAt;
  }

  loginTokenIsValid(token: string): boolean {
    if (!this.loginToken || !this.loginTokenExpiresAt) {
      return false;
    }
    const now = new Date();
    return this.loginToken === token && this.loginTokenExpiresAt > now;
  }

  setLastLogin(): void {
    this.lastLoginAt = new Date();
  }

  static create(id: string, email: string): User {
    const user = new User();
    user.id = id;
    user.email = email;
    return user;
  }
}
