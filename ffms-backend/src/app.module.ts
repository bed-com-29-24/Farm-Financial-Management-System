import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FarmersModule } from './farmers/farmers.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [FarmersModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
