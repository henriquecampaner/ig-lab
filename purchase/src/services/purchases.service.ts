import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';
import { KafkaService } from 'src/messaging/kafka.service';

type CreatePurchaseParams = {
  productId: string;
  customerId: string;
};

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService, private kafka: KafkaService) {}

  async listAllFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({ customerId, productId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error('Product not Found');
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });

    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    this.kafka.emit('purchases.new-purchase', {
      customer: {
        authUserId: customer.authUserId,
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
    });

    return purchase;
  }
}
