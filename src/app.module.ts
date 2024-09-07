import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmerModule } from './farmer/farmer.module';
import { Farmer } from './farmer/farmer.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Farmer],
      synchronize: true, // desabilitar em prod
    }),
    FarmerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
