// import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let service: MasterService;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(MasterService);
  // });

  beforeEach(() => {
    // const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    // valueServiceSpy.getValue.and.returnValue('fake value');

    // service = new MasterService(valueServiceSpy);

    // const fake = {getValue: () => 'fake from object'};
    // service = new MasterService(fake as ValueService);

    //service = new MasterService(new ValueService());
  });

  // it('should execute method getValue', () => {
  //   expect(service.getValue()).toBeTruthy();
  // });

  it('should call method getValue from ValueService', () => {

    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    valueServiceSpy.getValue.and.returnValue('fake value');

    const service = new MasterService(valueServiceSpy);

    expect(service.getValue()).toBe('fake value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });


});
