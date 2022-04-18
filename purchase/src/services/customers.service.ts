import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/databse/prisma/prisma.service';

type CreateCustomerParams = {
  authUserId: string;
};

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async createCustomer({ authUserId }: CreateCustomerParams) {
    return this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
