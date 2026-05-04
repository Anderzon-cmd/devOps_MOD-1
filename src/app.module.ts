import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [ProductsModule, BooksModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
