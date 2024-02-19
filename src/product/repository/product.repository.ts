import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../domain/product.entity';

@Injectable()
export class ProductRepository {
  private product: ProductEntity[] = [];

  listAll() {
    return this.product;
  }

  save(dataProduct: ProductEntity) {
    this.product.push(dataProduct);
    return dataProduct;
  }

  private searchById(id: string) {
    const possibleProduct = this.product.find((product) => product.id === id);

    if (!possibleProduct) {
      throw new Error('Produto não existe');
    }

    return possibleProduct;
  }

  async update(id: string, dataProduct: Partial<ProductEntity>) {
    const dataNotUpdatable = ['id', 'userId'];
    const product = this.searchById(id);
    Object.entries(dataProduct).forEach(([key, value]) => {
      if (dataNotUpdatable.includes(key)) {
        return;
      }
      product[key] = value;
    });

    return product;
  }

  async remove(id: string) {
    const productRemoved = this.searchById(id);
    this.product = this.product.filter((product) => product.id !== id);
    return productRemoved;
  }
}
