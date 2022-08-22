import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;
  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(ValueService);
  // });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  beforeEach(() => {
    service = new ValueService();
  });

  describe('Test to create the service', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Tests for getValue method', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('Tests for setValue method', () => {
    it('should change the value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('new value');
      expect(service.getValue()).toBe('new value');
    });
  });

  describe('Tests for getPromise using doneFn method', () => {
    it('should return "promise value" from promise', (doneFn) => {
      service.getPromiseValue()
      .then((value) => {
        expect(value).toBe('promise value');
        doneFn(); // Use this when you have asynchronous.
      });
    });
  });

  describe('Tests for getPromise using async await', () => {
    it('should return "promise value" from promise', async () => {
      const value = await service.getPromiseValue();
      expect(value).toBe('promise value');
    });
  });

  describe('Tests for getObservableValue', () => {
    it('should return "observable value"', (doneFn) => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('observable value');
        doneFn();
      });
    });
  });

});
