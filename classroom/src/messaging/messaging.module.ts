import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/databse/database.module';
import { CoursesServices } from 'src/services/courses.service';
import { EnrollmentsServices } from 'src/services/enrollments.service';
import { StudentsServices } from 'src/services/students.service';
import { PurchasesController } from './controllers/purchases.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchasesController],
  providers: [StudentsServices, CoursesServices, EnrollmentsServices],
})
export class MessagingModule {}
