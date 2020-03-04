import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Account } from './account';
import swal from 'sweetalert2';
import { AccountService } from './account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./account.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  titulo: string = 'porfavor ingresa tus credenciales!';
  account: Account;

  constructor(private accountService: AccountService, private router:Router) {
    this.account = new Account();
   }

  ngOnInit() {
    
    if (this.accountService.isAuthenticated()) {
      swal.fire('login', `hi ${this.accountService.account.username} ya estas logeado`, 'info')
      this.router.navigate(['/resetpassword']);
      
    }
    
  }

  public login():void{

    console.log(this.account);
    if (this.account.username == null || this.account.password == null) {
      swal.fire('Error login','username o password vacias', 'error');
      return;
    }
    this.accountService.login(this.account).subscribe(response => {
      console.log(response);
     // console.log(response.access_token);
      //guardo la informacion que viene en el token en payload antes, lo parseo a un json
      let payload = JSON.parse(atob(response.access_token.split(".")[1]));
      //console.log(payload);

     
      
      this.accountService.guardarCuenta(response.access_token);
      this.accountService.guardarToken(response.access_token);
      let account = this.accountService.account;
      //let payload = JSON.parse(atob(response.access_token.split(".")[1]));
           // console.log(account.email);
      let cuenta = this.accountService.account;
      this.router.navigate(['/register']);
      //tuve un error, tuve que acar el usuario del token, ya que por back me trae como username el email
      swal.fire('login',`hola ${cuenta.username}, has iniciado secion`, 'success');
    },
    err =>{
      if (err.status = 400) {
        swal.fire('Error', 'usuario o password incorrectas','error');
      }
    }
    );
    
  }

}
