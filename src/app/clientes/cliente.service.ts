import { Injectable } from '@angular/core';
import { Cliente} from './cliente';
import {formatDate, DatePipe} from '@angular/common';
import localeES from '@angular/common/locales/es-CL';
import { Observable, throwError } from 'rxjs';
import {of,observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable()

export class ClienteService {
  private urlEndPoint:string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {
   // return this.http.get<Cliente[]>(this.urlEndPoint);
   return this.http.get(this.urlEndPoint).pipe(
     tap(response =>{
       let clientes = response as Cliente[];
       console.log('tap-1');
       clientes.forEach( cliente =>{
       
         console.log(cliente.nombre);
         
       })
     }),
     map((response) => {
       let clientes = response as Cliente[];
       return clientes.map(cliente => {
        cliente.nombre = cliente.nombre.toUpperCase();
         let datePipe = new DatePipe('es');
         cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
         //cliente.createAt = datePipe.transform(cliente.createAt, 'dd/MM/yyy');
        // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyy', 'en-US');
         return cliente;
       });
     }
     ),
     tap(response =>{
      console.log('tap-2');
      response.forEach( cliente =>{
      
        console.log(cliente.apellido);
        
      })
    })
    );
  }

  create (cliente: Cliente): Observable<any>{
    console.log('primer comentario');
    
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      //creo que mejor es el obserbable (transformalo manualmente )
      map((response) => response.cliente as Cliente ),
      catchError(e =>{
        if (e.status == 400) {
          return throwError(e);
        }
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('error', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers:this.httpHeaders}).pipe(
      catchError(e =>{
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  delete(id:number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders}).pipe(
      catchError(e =>{
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }
}
