import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from '../courses.module';
import { COURSES } from '../../../../server/db-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { sortCoursesBySeqNo } from '../home/sort-course-by-seq';
import { Course } from '../model/course';
import { setupCourses } from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

  let courseComponent: CoursesCardListComponent,
    fixture: ComponentFixture<CoursesCardListComponent>,
    el: DebugElement;


  beforeEach(
    async () => {

      await TestBed.configureTestingModule({
        imports: [CoursesModule]
      }).compileComponents()

      fixture = TestBed.createComponent(CoursesCardListComponent)
      courseComponent = fixture.componentInstance;
      el = fixture.debugElement;

    }
  )

  it("should create the component", () => {

    expect(courseComponent).toBeTruthy();

  });


  it("should display the course list", () => {

    courseComponent.courses = setupCourses();
    fixture.detectChanges()

    const cards = el.queryAll(By.css('.course-card'));
    expect(cards).toBeTruthy('not showing courses')
    expect(cards.length).toBe(12,'Wrong length')


  });


  it("should display the first course", () => {

    courseComponent.courses = setupCourses();
    fixture.detectChanges()

    const course = courseComponent.courses[0];

    const card = el.query(By.css('.course-card:first-child')),
          title = card.query(By.css('mat-card-title')),
          image = card.query(By.css('img'))

    expect(card).toBeTruthy('not showing first card')
    expect(title.nativeElement.textContent).toBe(course.titles.description,'Wrong title')
    expect(image.nativeElement.src).toBe(course.iconUrl,'Wrong image')

  });


});


