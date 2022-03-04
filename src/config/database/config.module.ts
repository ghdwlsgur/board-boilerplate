import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MySqlConfigService } from './config.service';
import configuration from './config.entry';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  providers: [MySqlConfigService],
})
export class MySqlConfigModule {}
