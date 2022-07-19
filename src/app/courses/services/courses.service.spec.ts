import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { CoursesService } from "./courses.service"
import { COURSES } from "../../../../server/db-data"
import { Course } from "../model/course"
import { HttpErrorResponse } from "@angular/common/http"

describe("CourseService", () => {

  let coursesService: CoursesService,
    httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService
      ]
    })

    coursesService = TestBed.inject(CoursesService),
      httpTestingController = TestBed.inject(HttpTestingController)
  })

  it('should return all courses', () => {
    coursesService.findAllCourses().subscribe(res => {
      expect(res).toBeTruthy('No Course Returned')
      expect(res.length).toBe(12, ' Invalid course count')


      const course = res.find(x => x.id == 12);
      expect(course.titles.description).toBe('Angular Testing Course')
    })

    const req = httpTestingController.expectOne('/api/courses');

    expect(req.request.method).toBe('GET')

    req.flush({ payload: Object.values(COURSES) })


  })
  it('should find course by ID', () => {
    coursesService.findCourseById(12).subscribe(res => {
      expect(res).toBeTruthy('No Course Returned')
      expect(res.id).toBe(12, ' Invalid course Id')
      expect(res.titles.description).toBe('Angular Testing Course')
    })

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toBe('GET')

    req.flush(COURSES[12])


  })

  it('should save data property to server', () => {

    const changes: Partial<Course> = { titles: { description: 'Mmohammad babaei' } }
    coursesService.saveCourse(12, changes).subscribe(res => {
      expect(res.id).toBe(12);
    })

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toBe('PUT')
    expect(req.request.body).toBe(changes)

    req.flush({
      ...COURSES[12],
      ...changes
    })
  })
  it('should give err if save fails', () => {

    const changes: Partial<Course> = { titles: { description: 'Mmohammad babaei' } }
    coursesService.saveCourse(12, changes).subscribe(
      res => fail('Save data should rturn err'),
      (err: HttpErrorResponse) => {
        expect(err.status).toBe(500);
        expect(err.statusText).toBe('Nono')
      }
      )

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toBe('PUT')

    req.flush('Wrong data',{
      status:500,
      statusText:'Nono'
    })
  })
  it('should find list of lessons', () => {


    coursesService.findLessons(12).subscribe(
      res => expect(res).toBeTruthy()
      )

    const req = httpTestingController.expectOne(req=> req.url == '/api/lessons');

    expect(req.request.method).toBe('GET')
    expect(req.request.params.get('courseId')).toEqual('12')
    expect(req.request.params.get('sortOrder')).toEqual('asc')

    req.flush({payload:[]})
  })

  afterEach(() => {
    httpTestingController.verify();
  })
})
