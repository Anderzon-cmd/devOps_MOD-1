import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: ProductEntity[] = [];
  private idCounter = 1;

  create(createProductDto: CreateProductDto): ProductEntity {
    const product: ProductEntity = {
      id: this.idCounter++,
      ...createProductDto,
      createdAt: new Date(),
    };
    this.products.push(product);
    return product;
  }

  findAll(): ProductEntity[] {
    return this.products;
  }

  findOne(id: number): ProductEntity {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto): ProductEntity {
    const product = this.findOne(id);
    Object.assign(product, updateProductDto);
    return product;
  }

  remove(id: number): void {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    this.products.splice(index, 1);
  }
}
