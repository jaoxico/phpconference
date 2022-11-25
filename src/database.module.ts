import { Module } from '@nestjs/common';
import { datasourceProviders } from './datasource.providers';

@Module({
  providers: [...datasourceProviders],
  exports: [...datasourceProviders],
})
export class DatabaseModule {}
