import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service"
import { LoggerService } from "./logger.service";

describe('Calcaulator Service', () => {

  let calculator: CalculatorService,
    loggerSpy: any

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log'])

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy }
      ]
    })
    calculator = TestBed.inject(CalculatorService)
  })

  it('should add two numbers', () => {
    const result = calculator.add(2, 3)

    expect(result).toBe(5)
    expect(loggerSpy.log).toHaveBeenCalledTimes(1)
  })
  it('should subtract two numbers', () => {
    const result = calculator.subtract(3, 2)

    expect(result).toBe(1, 'Wrong subtraction is made :(')
  })

})
