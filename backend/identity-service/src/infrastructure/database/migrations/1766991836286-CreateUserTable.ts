import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1766991836286 implements MigrationInterface {
    name = 'CreateUserTable1766991836286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "email" character varying NOT NULL, "loginToken" character varying(50) NOT NULL, "loginTokenExpiresAt" TIMESTAMP, "lastLoginAt" TIMESTAMP, "createdAt" TIMESTAMP, "updatedAt" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
