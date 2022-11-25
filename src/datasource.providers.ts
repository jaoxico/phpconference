import { DataSource } from 'typeorm';
import { config } from './dataSourceConfig';
import { Provider } from '@nestjs/common';

export const dataSource = new DataSource(config);
export const datasourceProviders: Array<Provider<DataSource>> = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (): Promise<DataSource> => {
      if (dataSource.isInitialized) return dataSource;
      return await dataSource.initialize();
    },
  },
];
