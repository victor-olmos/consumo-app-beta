import {Injectable} from '@angular/core';
import {Register} from './register';
import { Observable, throwError } from 'rxjs';
//import {of} from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';


@Injectable()
export class RegisterService{
    private urlEndPoint: string ='http://localhost:8080/api/registro';

    private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

    constructor(private http: HttpClient){}

   

    create (register: Register): Observable<any>{
       
        return this.http.post<any>(this.urlEndPoint, register, {headers: this.httpHeaders}).pipe(
          //creo que mejor es el obserbable (transformalo manualmente )
          map((response) => response.register as Register []),

          
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

}