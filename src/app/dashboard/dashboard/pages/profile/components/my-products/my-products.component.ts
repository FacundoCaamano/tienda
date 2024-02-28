import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserService } from '../../service/user.service';
import { Products } from '../../../products/models';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {

  private userId:string | undefined
  editingProductId: string | null = null; 
  products!: Observable<Products[]>
  editedProduct!: Products; 
  constructor(private authService:AuthService, private userService:UserService){
    this.authService.user$.pipe(take(1)).subscribe(
      data =>{
        this.userId = data?.id
      }
    )
  }

  ngOnInit(): void {
    if(this.userId){
      this.userService.loadProducts(this.userId)
      this.products = this.userService.products$
    }
  }

  deleteProduct(id:string){
    this.userService.deleteProduct(id)
    
  }

  editProduct(product:any){
    console.log('edit');
    this.editingProductId = product._id
    this.editedProduct = {
      ...product
    }
  }
  clearProductEdit(){
    this.editingProductId = null; 
  }
  saveProduct(){
    console.log('save');
    console.log(this.editedProduct);
    this.userService.editProduct(
      this.editingProductId,
      this.editedProduct.title,
      this.editedProduct.price,
      this.editedProduct.description,
      this.editedProduct.code,
      this.editedProduct.stock
      )
    this.editingProductId = null; // Desactivar el modo de edición
  }
  
  stock(){
    console.log('stock');
    
  }
}
