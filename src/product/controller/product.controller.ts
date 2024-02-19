import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { UpdateProductDTO } from '../dto/UpdateProduct.dto';
import { CreateProductDTO } from '../dto/CreateProduct';
import { ProductEntity } from '../domain/product.entity';
import { ProductRepository as ProductRepository } from '../repository/product.repository';

@Controller('produts')
export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  @Post()
  async criaNovo(@Body() dataProduct: CreateProductDTO) {
    const product = new ProductEntity();

    product.id = randomUUID();
    product.name = dataProduct.name;
    product.userId = dataProduct.userId;
    product.value = dataProduct.value;
    product.quantity = dataProduct.quantity;
    product.description = dataProduct.description;
    product.category = dataProduct.category;
    product.characteristics = dataProduct.characteristics;
    product.image = dataProduct.image;

    const productRegistered = this.productRepository.save(product);
    return productRegistered;
  }

  @Get()
  async listAll() {
    return this.productRepository.listAll();
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() dataProduct: UpdateProductDTO,
  ) {
    const productChanged = await this.productRepository.update(
      id,
      dataProduct,
    );

    return {
      message: 'produto atualizado com sucesso',
      product: productChanged,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const productRemoved = await this.productRepository.remove(id);

    return {
      message: 'produto removido com sucesso',
      product: productRemoved,
    };
  }
}
