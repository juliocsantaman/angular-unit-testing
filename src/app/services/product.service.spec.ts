import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { environment } from 'src/environments/environment';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';
import { HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { TokenService } from './token.service';

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProductService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
        }
      ]
    });
    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('Tests for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(2);

      spyOn(tokenService, 'getToken').and.returnValue('123');

      productService.getAllSimple().subscribe((products) => {
        expect(products.length).toEqual(mockData.length);
        expect(products).toEqual(mockData);
        doneFn();
      });

      // http config.
      const url = `${environment.API_URL}/api/products`;
      const req = httpTestingController.expectOne(url);
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer 123');
      req.flush(mockData);
      httpTestingController.verify();

    });
  });

  describe('Tests for getAll', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(2);

      productService.getAll().subscribe((products) => {
        expect(products.length).toEqual(mockData.length);
        doneFn();
      });

      // http config.
      const url = `${environment.API_URL}/api/products`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockData);
      httpTestingController.verify();

    });

    it('should return a product list with taxes', (doneFn) => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100 // 100 * .19 = 19.
        },
        {
          ...generateOneProduct(),
          price: 200 // 200 * .19 = 38.
        },
        {
          ...generateOneProduct(),
          price: 0 // 0 * .19 = 0.
        },
        {
          ...generateOneProduct(),
          price: -100 // -100 * .19 = -19 -> 0.
        }
      ];

      productService.getAll().subscribe((products) => {
        expect(products.length).toEqual(mockData.length);
        expect(products[0].taxes).toEqual(19);
        expect(products[1].taxes).toEqual(38);
        expect(products[2].taxes).toEqual(0);
        expect(products[3].taxes).toEqual(0);
        doneFn();
      });

      // http config.
      const url = `${environment.API_URL}/api/products`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockData);
      httpTestingController.verify();
    });


    it('should send query params with limit 10 and offset 3', (doneFn) => {
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;

      productService.getAll(limit, offset).subscribe((products) => {
        expect(products.length).toEqual(mockData.length);
        doneFn();
      });

      // http config.
      const url = `${environment.API_URL}/api/products?limit=${limit}&offset=${offset}`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
      httpTestingController.verify();
    });

  });

  describe('Tests for create', () => {
    it('should return a new product', (doneFn) => {
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new product',
        price: 100,
        images: ['img'],
        description: 'xd xd',
        categoryId: 12
      }

      productService.create({ ...dto }).subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config.
      const url = `${environment.API_URL}/api/products`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      httpTestingController.verify();

    });
  });

  describe('Tests for update', () => {
    it('should return an update of some product', (doneFn) => {
      const mockData = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'UPDATE new product',
      }
      const productId = '1';

      productService.update(productId, { ...dto }).subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config.
      const url = `${environment.API_URL}/api/products/${productId}`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(dto);
      req.flush(mockData);
      httpTestingController.verify();

    });
  });

  describe('Tests for delete', () => {
    it('should return a boolean, true if product is deleted', (doneFn) => {
      const mockData = true;
      const productId = '1';

      productService.delete(productId).subscribe((data) => {
        expect(data).toBeTrue();
        doneFn();
      });

      // http config.
      const url = `${environment.API_URL}/api/products/${productId}`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockData);
      httpTestingController.verify();

    });
  });

  describe('Tests for getOne method', () => {
    it('should return a product', (doneFn) => {
      const mockData: Product = generateOneProduct();
      const productId: string = '1';
      productService.getOne(productId).subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config.
      const url = `${environment.API_URL}/api/products/${productId}`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
      httpTestingController.verify();

    });

    it('should return the right messages when the status code is 404', (doneFn) => {
      const productId: string = '1';
      const errorMessage = 'Message 404';
      const errorMock = {
        status: HttpStatusCode.NotFound,
        statusText: errorMessage
      };
      productService.getOne(productId).subscribe
        (
          {
            // next: (data) => {
            // },

            error: (err) => {
              expect(err.toString()).toContain('El producto no existe');
              doneFn();
            },

            // complete: () => {
            //   console.log('Complete');
            // }
          }
        );

      // http config.
      const url = `${environment.API_URL}/api/products/${productId}`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(errorMessage, errorMock);
      httpTestingController.verify();

    });

  });

});
