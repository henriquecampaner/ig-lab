import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { CurrentUser } from 'src/http/auth/currentUser';
import { EnrollmentsServices } from 'src/services/enrollments.service';
import { StudentsServices } from 'src/services/students.service';
import { AuthUser } from 'src/types/authUser';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private readonly studentsService: StudentsServices,
    private readonly enrollmentsService: EnrollmentsServices,
  ) {}

  @Query(() => Student)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.studentsService.getStudentByAuthUserId(user.sub);
  }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    console.log(student);
    return this.enrollmentsService.listEnrollmentByStudent(student.id);
  }
}
