import {Injectable} from '@angular/core';
import {Account} from './account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';



@Injectable()
export class AccountService{

  private _account: Account;
  private _token : string;

    private urlEndPoint: string ='http://localhost:8080/api/registro';

    public httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

    constructor(public http: HttpClient){}
    public get account(): Account{
       if (this._account !=null) {
         return this._account;
       }else if (this._account == null && sessionStorage.getItem('account') != null) {
         this._account = JSON.parse(sessionStorage.getItem('account'))as Account;
         return this._account;
       }
       return new Account();
    }

    public get token(): string{

      if (this._token !=null) {
        return this._token;
      }else if (this._token == null && sessionStorage.getItem('token') != null) {
        this._token = sessionStorage.getItem('token');
        return this._token;
      }

    }

    create (account: Account): Observable<any>{
       
        return this.http.post<any>(this.urlEndPoint, account, {headers: this.httpHeaders}).pipe(
          
          map((response) => response.account as Account []),
    
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

      login(account: Account): Observable<any> {
        const urlEndpoint = 'http://localhost:8080/oauth/token';
    
        const credenciales = btoa('angularapp' + ':' + '12345');
    
        const httpHeaders = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + credenciales
        });
    
        let params = new URLSearchParams();
        params.set('grant_type', 'password');
        params.set('username', account.username);
        params.set('password', account.password);
        console.log(params.toString());
        return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
      }

      guardarCuenta(accessToken: string):void{
        let payload = this.obtenerDatosToken(accessToken);
        this._account = new Account();
        this._account.username = payload.usuario;
        this._account.email = payload.email;
        sessionStorage.setItem('account', JSON.stringify(this._account));
      }

      guardarToken(accessToken: string):void{
        this._token = accessToken;
        sessionStorage.setItem('token',accessToken);
      }

      obtenerDatosToken(accessToken: string):any{
        if (accessToken != null) {
          return JSON.parse(atob(accessToken.split(".")[1]));
        }
      }

      isAuthenticated():boolean{
        let payload = this.obtenerDatosToken(this.token);
        if (payload !=null && payload.user_name && payload.user_name.length>0){
          return true;
        }
        return false;

      }
}