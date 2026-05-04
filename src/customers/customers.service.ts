import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  private customers: CustomerEntity[] = [];
  private idCounter = 1;

  create(createCustomerDto: CreateCustomerDto): CustomerEntity {
    const customer: CustomerEntity = {
      id: this.idCounter++,
      ...createCustomerDto,
      createdAt: new Date(),
    };

    this.customers.push(customer);
    return customer;
  }

  findAll(): CustomerEntity[] {
    return this.customers;
  }

  findOne(id: number): CustomerEntity {
    const customer = this.customers.find((c) => c.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto): CustomerEntity {
    const customer = this.findOne(id);
    Object.assign(customer, updateCustomerDto);
    return customer;
  }

  remove(id: number): void {
    const index = this.customers.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    this.customers.splice(index, 1);
  }
}
