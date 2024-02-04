import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products/service/products.service';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  sellerId!:string | undefined
  constructor(private fb: FormBuilder, private productService:ProductsService, private authService:AuthService) {
    this.authService.user$.subscribe(
      (data)=>{
        this.sellerId = data?.id
      }
    )
  }

  form = this.fb.group({
    title: ['', Validators.required],
    price: [0, Validators.required],
    thumbnails: this.fb.array([
      this.fb.control('', Validators.required)
    ]),
    description: ['', Validators.required],
    code: ['', Validators.required],
    stock: [0, Validators.required]
  });

  get thumbnailsArray(): FormArray {
    return this.form.get('thumbnails') as FormArray;
  }

  addThumbnailField() {
    this.thumbnailsArray.push(this.fb.control('', Validators.required));
  }

  deleteThumbnailField(i: number){
    this.thumbnailsArray.removeAt(i)
  }

  create() {
    if(this.form.invalid){
      this.form.markAllAsTouched()
    }
    else{
      const product ={
        title:this.form.value.title as string,
        price:this.form.value.price as number,
        thumbnail: this.form.value.thumbnails as Array<string>,
        description:this.form.value.description as string,
        code:this.form.value.code as string,
        stock: this.form.value.stock as number,
        sellerId : this.sellerId as string
      }
      this.productService.postProduct(product)
    }
    console.log(this.form.value);
  }
}
