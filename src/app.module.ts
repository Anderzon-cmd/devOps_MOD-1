import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
