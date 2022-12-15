import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

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

  constructor(
    private productService: ProductService
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

}
