import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrganizationAndMembership1767342420280 implements MigrationInterface {
    name = 'CreateOrganizationAndMembership1767342420280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."memberships_role_enum" AS ENUM('owner', 'admin')`);
        await queryRunner.query(`CREATE TABLE "memberships" ("organizationId" character varying NOT NULL, "userId" character varying NOT NULL, "role" "public"."memberships_role_enum" NOT NULL, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, CONSTRAINT "PK_64893eb3c6fcaeaaee71a4d0ae1" PRIMARY KEY ("organizationId", "userId"))`);
        await queryRunner.query(`CREATE TABLE "organizations" ("id" character varying NOT NULL, "name" character varying NOT NULL, "referenceId" character varying NOT NULL, "createdBy" character varying NOT NULL, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, CONSTRAINT "UQ_94e06a997321698b785d806b4ec" UNIQUE ("referenceId"), CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "memberships" ADD CONSTRAINT "FK_98d23786d647f0ccf477b3b2867" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "memberships" ADD CONSTRAINT "FK_187d573e43b2c2aa3960df20b78" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "memberships" DROP CONSTRAINT "FK_187d573e43b2c2aa3960df20b78"`);
        await queryRunner.query(`ALTER TABLE "memberships" DROP CONSTRAINT "FK_98d23786d647f0ccf477b3b2867"`);
        await queryRunner.query(`DROP TABLE "organizations"`);
        await queryRunner.query(`DROP TABLE "memberships"`);
        await queryRunner.query(`DROP TYPE "public"."memberships_role_enum"`);
    }

}
