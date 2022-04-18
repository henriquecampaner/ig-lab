import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { CurrentUser } from 'src/http/auth/currentUser';
import { CoursesServices } from 'src/services/courses.service';
import { EnrollmentsServices } from 'src/services/enrollments.service';
import { StudentsServices } from 'src/services/students.service';
import { AuthUser } from 'src/types/authUser';
import { CreateCourseInput } from '../inputs/createCourseInput';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private readonly coursesServices: CoursesServices,
    private readonly studentsServices: StudentsServices,
    private readonly enrollmentsServices: EnrollmentsServices,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesServices.listAllCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentsServices.getStudentByAuthUserId(
      user.sub,
    );

    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment = await this.enrollmentsServices.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id,
    });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.coursesServices.getCourseById(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesServices.createCourse(data);
  }
}
