import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenId1767078266026 implements MigrationInterface {
    name = 'AddRefreshTokenId1767078266026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshTokenId" character varying(32)`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_19be66e444b5c2b9af008d321a0" UNIQUE ("refreshTokenId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_19be66e444b5c2b9af008d321a0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshTokenId"`);
    }

}
