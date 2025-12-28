import { Module } from '@nestjs/common';
import { ValidationPipe } from './pipes/validation.pipe';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
    }),
  ],
  providers: [ValidationPipe],
  exports: [ValidationPipe],
})
export class CoreModule {}
