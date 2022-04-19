import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/databse/prisma/prisma.service';

type CreateCourseParams = {
  title: string;
  slug?: string;
};

@Injectable()
export class CoursesServices {
  constructor(private readonly prisma: PrismaService) {}

  listAllCourses() {
    return this.prisma.course.findMany();
  }

  getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
  }

  async createCourse({
    title,
    slug = slugify(title, { lower: true }),
  }: CreateCourseParams) {
    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseAlreadyExists) {
      throw new Error('Course already exists');
    }

    return await this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
