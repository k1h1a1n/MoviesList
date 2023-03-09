import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginInput, LoginOutput } from '../../model/login';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  disableLogin:boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  get controller(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  onSubmit(formData: any) {
    if (this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return
    }
    this.disableLogin = true; 
    const input: LoginInput = {
      username: `${formData.userName}`,
      password: `${formData.password}`,
    };
    this.loginService.authenticate(input).pipe(
      catchError((error)=> {
        this.disableLogin = false;
        console.log(error.error , 'error looded')
        return of()
      })
    ).subscribe((x:LoginOutput) =>{
      this.disableLogin = false;
    })
  }
}
