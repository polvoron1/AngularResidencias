import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  //public contrasena!: string;
  //public correo!: string;
  constructor(private formBuilder: FormBuilder,private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/user")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password
      });
      if(user){
        alert("Login Realizado!");
        this.loginForm.reset();
        this.router.navigate(['employee-dashboard'])
      }else{
        alert("Usuario No Registrado")
      }
    },err=>{
      alert("Algo Salio Mal!")
    })
  }
  save(){
    /*if(this.correo && this.contrasena){
      const usr = new UserDTO();
      usr.email = this.correo;
      usr.password = this.contrasena;

      this.authService.login2(usr);
    }
    return;*/
    sessionStorage.setItem('formdata',JSON.stringify(this.loginForm.value));
  }
  
  

}
