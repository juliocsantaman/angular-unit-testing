import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from 'src/app/services/product.service';
import { ProductComponent } from '../product/product.component';
import { ProductsComponent } from './products.component';
import { generateManyProducts } from '../../models/product.mock';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let productComponent: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {

    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    productComponent = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
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

  });

});
