import { Module } from '@nestjs/common';
import { DatabseModule } from './databse/databse.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [DatabseModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
