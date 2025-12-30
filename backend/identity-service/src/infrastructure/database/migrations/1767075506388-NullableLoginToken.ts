import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableLoginToken1767075506388 implements MigrationInterface {
    name = 'NullableLoginToken1767075506388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "loginToken" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "loginToken" SET NOT NULL`);
    }

}
