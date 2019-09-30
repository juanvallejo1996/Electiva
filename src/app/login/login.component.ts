import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'servicios'
  public username: "";
  public pass: "";
  constructor(
    private loginService: LoginService,
    private router: Router ) { }

  ngOnInit() {
  }

  public login() {
    this.loginService.loginSuccesful(this.username, this.pass).subscribe(dataSuccesful => {
      if (dataSuccesful.message.includes("logueado")) {
        console.log(dataSuccesful);
        alert("Te has logueado correctamente")
        localStorage.setItem("token", dataSuccesful.token)
        this.router.navigate(['/dashboard'])
      }
      else {
        if (dataSuccesful.message.includes('No existe el usuario:')) {
          alert("Usuario incorrecto");
        }
        if (dataSuccesful.message.includes('Error de contraseña:')) {
          alert("Contraseña incorrecta");
        }
      }
    });
  }


}
