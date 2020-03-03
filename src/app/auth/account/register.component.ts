import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Account} from './account'
import swal from 'sweetalert2';
import {tap} from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';
import { AccountService } from './account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./account.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  private account: Account = new Account()
    //private register: Register = new Register()
    private titulo:string = "crear cuenta";
    private errores: string[];
    private mensajes: string[];

  constructor(private accountService: AccountService,
    private router:Router) { }

  ngOnInit() {
  }

  public create():void{
   
    
    this.accountService.create(this.account).subscribe(register => {
      this.router.navigate(['/login'])
      //falta poner alerta
    },
    err => {
      this.errores = err.error.errors as string [];
      console.log('el codigo es:' + err.status);
      console.log(err.error.errors);
    }
  );
    
  }

}
