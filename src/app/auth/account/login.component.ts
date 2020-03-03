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
    
    
  }

  public login():void{

    console.log(this.account);
    if (this.account.username == null || this.account.password == null) {
      swal.fire('Error login','username o password vacias', 'error');
      return;
    }
    this.accountService.login(this.account).subscribe(response => {
      this.accountService.guardarCuenta(response.access_token);
      this.accountService.guardarToken(response.access_token);
      let account = this.accountService.account;
      //let payload = JSON.parse(atob(response.access_token.split(".")[1]));
           // console.log(account.email);
            
      this.router.navigate(['/register']);
      swal.fire('login',`hola ${account.username}, has iniciado secion`, 'success');
    });
    
  }

}
