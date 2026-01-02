import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshToken1767077334699 implements MigrationInterface {
    name = 'AddRefreshToken1767077334699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshTokenHash" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshTokenExpiresAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshTokenExpiresAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshTokenHash"`);
    }

}
