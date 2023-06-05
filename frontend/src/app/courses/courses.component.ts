import { Component } from '@angular/core';
import { Category, Course } from '../app.component';
import { CourseService } from '../../services/course.service';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses: Course[] = [];
  categories: Category[] = [];

  

  constructor(private categoryService: CategoryService, private courseService: CourseService){}

  ngOnInit(): void {
    this.getCourses();
    this.getCategories();

  }

  getCourses(): void{
    this.courseService.getCourses()
      .subscribe(response => this.courses = response.payload);
    console.log(this.courses);
  }

  getCategories(): void{
    this.categoryService.getCategories()
      .subscribe(response => this.categories = response.payload);
    console.log(this.categories);
  }

  getCoursesByCategory(id: number): void{
    this.courseService.getCoursesByCategory(id)
      .subscribe(response => this.courses = response.payload);
    console.log(this.courses);
  }

  onCategoryClick(category:any): void
  {
    console.log(category);
    if(category != null)
    {
      this.courseService.getCoursesByCategory(category.id)
      .subscribe(response => this.courses = response.payload);
      console.log(this.courses);
    }
  }
}
