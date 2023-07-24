import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ProductService } from 'src/app/services/product.service';
import { ProductComponent } from '../product/product.component';
import { ProductsComponent } from './products.component';
import { generateManyProducts } from '../../models/product.mock';
import { of, defer } from 'rxjs';
import { ValueService } from 'src/app/services/value.service';

describe('ProductsComponent', () => {
  let productComponent: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let valueService: jasmine.SpyObj<ValueService>;
  
  beforeEach(async () => {

    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getAll']);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getPromiseValue']);

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ValueService, useValue: valueServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    productComponent = fixture.componentInstance;

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;

    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(productComponent).toBeTruthy();
  });

  describe('Tests for getAll', () => {

    it('productService has called getAll method', () => {
      expect(productService.getAll).toHaveBeenCalled();
    });

    it('should return a product list from the service', () => {
      // Arrange.
      const productMock = generateManyProducts(10);
      productService.getAll.and.returnValue(of(productMock));
      const countPrevious = productComponent.products.length;

      // Act.
      productComponent.getAll();
      fixture.detectChanges();

      // Assert.
      expect(productComponent.products.length).toEqual(productMock.length + countPrevious);
    });

    it('should change the status "loading" => "success" ', fakeAsync(() => {
      // Arrange - Organizar.
      const productMock = generateManyProducts(10);
      productService.getAll.and.returnValue(defer(() => Promise.resolve(productMock)));
      const countPrevious = productComponent.products.length;

      // Act - Acto.
      productComponent.getAll();
      fixture.detectChanges();

      expect(productComponent.status).toEqual('loading');
      tick();
      fixture.detectChanges();

      // Assert - Asegurar.
      expect(productComponent.status).toEqual('success');
    }));

    it('should change the status "loading" => "error" ', fakeAsync(() => {
      // Arrange - Organizar.
      productService.getAll.and.returnValue(defer(() => Promise.reject('error')));
      // Act - Acto.
      productComponent.getAll();
      fixture.detectChanges();

      expect(productComponent.status).toEqual('loading');
      tick();
      fixture.detectChanges();

      // Assert - Asegurar.
      expect(productComponent.status).toEqual('error');
    }));

  });

  describe('Tests for callPromise()', () => {
    it('should call to promise', fakeAsync( () => {
      // Arrange.
      const msgMock = 'My mock string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(msgMock));
      
      // Act.
      productComponent.callPromise();
      tick();
      fixture.detectChanges();

      // Assert.
      expect(productComponent.response).toEqual(msgMock);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    }));
  });


});
