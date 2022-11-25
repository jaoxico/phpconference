import { MigrationInterface, QueryRunner } from "typeorm";

export class inicial1669293344167 implements MigrationInterface {
    name = 'inicial1669293344167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`cursos\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`nomeCurso\` varchar(100) NOT NULL,
                \`duracaoCurso\` int NOT NULL DEFAULT '0',
                \`descritivoCurso\` text NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`cursos\`
        `);
    }

}
