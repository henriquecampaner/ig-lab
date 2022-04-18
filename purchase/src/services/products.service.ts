import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from 'src/databse/prisma/prisma.service';

type CreateProductParams = {
  title: string;
};

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async listAllProducts() {
    return this.prisma.product.findMany();
  }

  getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, {
      lower: true,
    });

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (productWithSameSlug) {
      throw new Error('There is a product with same slug');
    }

    return await this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
