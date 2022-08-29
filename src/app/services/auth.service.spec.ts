import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { flush, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { TokenInterceptor } from '../interceptors/token.interceptor';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
        }
      ]
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });


  describe('Tests for login', () => {
    
    it('should return a token', (doneFn) => {
      const mockData = {
        access_token: '121212'
      };

      const email = 'julio@gmail.com';
      const password = '123';

      authService.login(email, password).subscribe((data) => {

        expect(data).toEqual(mockData);
        doneFn();
      });

      
      // http config.
      const url = `${environment.API_URL}/api/auth/login`;
      const req = httpTestingController.expectOne(url);
      // const headers = req.request.headers;
      // expect(headers.get('Authorization')).toEqual('Bearer')
      req.flush(mockData);


    });

    it('should call to saveToken', (doneFn) => {
      const mockData = {
        access_token: '121212'
      };

      const email = 'julio@gmail.com';
      const password = '123';
      spyOn(tokenService, 'saveToken').and.callThrough();

      authService.login(email, password).subscribe((data) => {

        expect(data).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith('121212');
        doneFn();
      });

      
      // http config.
      const url = `${environment.API_URL}/api/auth/login`;
      const req = httpTestingController.expectOne(url);
      // const headers = req.request.headers;
      // expect(headers.get('Authorization')).toEqual('Bearer')
      req.flush(mockData);


    });


  });


});
