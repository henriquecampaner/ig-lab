import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/databse/prisma/prisma.service';

@Injectable()
export class StudentsServices {
  constructor(private readonly prisma: PrismaService) {}
  getStudentByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  listAllStudents() {
    return this.prisma.student.findMany();
  }

  getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }
}
