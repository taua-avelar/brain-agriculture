import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableFarmer1725773499386 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'farmer',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'document',
            type: 'varchar',
            length: '14',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'farmName',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'city',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'state',
            type: 'varchar',
            length: '2',
          },
          {
            name: 'totalArea',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'arableArea',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'vegetationArea',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'crops',
            type: 'text',
            isArray: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('farmer');
  }
}
