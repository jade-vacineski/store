import { Injectable } from '@nestjs/common';

import { Product, Prisma } from '@prisma/client';
import PrismaService from 'src/database/prisma.service';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }

    async getProduct(productId: string): Promise<Product | null> {
        return this.prisma.product.findUnique({
            where: { id: productId },
        });
    }

    async getAllProducts(): Promise<Product[]> {
        return this.prisma.product.findMany();
    }

    async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
        return this.prisma.product.create({
            data,
        });
    }

    async updateProduct(productId: string, data: Prisma.ProductUpdateInput): Promise<Product> {
        return this.prisma.product.update({
            where: { id: productId },
            data,
        });
    }

    async deleteProduct(productId: string): Promise<Product> {
        return this.prisma.product.delete({
            where: { id: productId },
        });
    }
}
