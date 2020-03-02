import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Register} from './register';
import { RegisterService } from './register.service';
import swal from 'sweetalert2';
import {tap} from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

    private register: Register = new Register()
    private titulo:string = "crear cuenta";
    private errores: string[];
    private mensajes: string[];

  constructor(private registerService: RegisterService,
    private router:Router) { }

  ngOnInit() {
  }

  public create():void{
   
    this.register.enable = true;
    this.registerService.create(this.register).subscribe(register => {
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
