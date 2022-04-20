import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  ResolveReference,
} from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { EnrollmentsServices } from 'src/services/enrollments.service';
import { StudentsServices } from 'src/services/students.service';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private readonly studentsService: StudentsServices,
    private readonly enrollmentsService: EnrollmentsServices,
  ) {}

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

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.studentsService.getStudentByAuthUserId(reference.authUserId);
  }
}
