import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sales } from '../model';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private url = environment.api

  public sales:Sales[] = []

  constructor(private http:HttpClient) {}

   getSales(userId:string){
    return this.http.get<Sales[]>(this.url + '/sales/' + userId)
  }
}