import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, map, mergeMap, take } from 'rxjs';
import { Address, user, userData } from 'src/app/auth/models';
import { AuthService } from 'src/app/auth/service/auth.service';
import { environment } from 'src/environments/environment';
import { Products } from '../../products/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.api

  private _buys$ = new BehaviorSubject([])
  private buys$ = this._buys$.asObservable()

  private _products$ = new BehaviorSubject<Products[]>([]);
  // Observable para exponer los productos
  public products$ = this._products$.asObservable();

  constructor(
    private http:HttpClient,
    private authService:AuthService
    ) {}


  loadBuys(id:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token')!
      })
    }
    this.http.get(this.url + '/buys/' + id, httpOptions).subscribe({
      next: (data:any)=>{
        this._buys$.next(data)
      }
    })
  }
  getBuys(){
    return this.buys$
  }
  
  loadProducts(userId: string): void {
    this.http.get<Products[]>(`${this.url}/products/my-products/${userId}`).pipe(take(1)).subscribe({
      next: (data: Products[]) => {
        // Emite los nuevos productos a los suscriptores
        this._products$.next(data);
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      }
    });
  }

  // Método para eliminar un producto
  deleteProduct(productId: string): void {
    this.http.delete<Products[]>(`${this.url}/products/delete-product/${productId}`)
    .pipe(mergeMap((productDelete) => this._products$
    .pipe(take(1),map((arrayActual)=> arrayActual.filter(p=> p._id !== productId))
    )
    )
    ).
    subscribe({
      next: (data) => {
        // Emitir un evento de actualización después de eliminar el producto
        this._products$.next(data);
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    });
  }
  editProduct(productId: any, title: string, price: number, description: string, code: string, stock: number): void {
    this.http.put<Products>(`${this.url}/products/edit-my-products/${productId}`, { title, price, description, code, stock })
      .subscribe({
        next: (updatedProduct: Products) => {
          // Actualizar la lista de productos con el producto editado
          this._products$.pipe(take(1)).subscribe(products => {
            const updatedProducts = products.map(product => {
              if (product._id === productId) {
                return { ...product, title, price, description, code, stock };
              }
              return product;
            });
            // Emitir los nuevos productos
            this._products$.next(updatedProducts);
          });
        },
        error: (error) => {
          console.error('Error al editar el producto:', error);
        }
      });
  }
}


 
