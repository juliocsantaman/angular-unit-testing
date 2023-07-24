import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  limit: number = 10;
  offset: number = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  response: string = '';

  constructor(
    private productService: ProductService,
    private valueService: ValueService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.status = 'loading';
    this.productService.getAll(this.limit, this.offset).subscribe(
      {
        error: () => {
          this.status = 'error';
        },

        next: (products) => {

          if (products.length > 0) {
            this.products = [...this.products, ...products];
            this.offset += 10;
            this.status = 'success';
          } else {
            this.status = 'error';
          }

        },

        complete: () => {

        }
      }
    );
  }

  async callPromise() {
    const response = await this.valueService.getPromiseValue();
    this.response = response;
  }

}
