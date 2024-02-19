import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ProductController } from './controller/product.controller';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [UserModule],
  controllers: [ProductController],
  providers: [ProductRepository],
})
export class ProductModule {}
