import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

//Servicio autenticación
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm : FormGroup

  constructor(
    private autService : AuthService,
    private formBuilder : FormBuilder,
    private router : Router,
    private alerController : AlertController,
    private loadingController : LoadingController,
    private activatedRoute : ActivatedRoute
  ) {

    this.initFormRegister();
    this.activatedRoute.params
    .subscribe(() => {
      this.registerForm.reset()
    })
   }

  ngOnInit() {
  }

  private initFormRegister(){
    this.registerForm = this.formBuilder.group ({
      name : ['',[Validators.required]],
      lastname : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async singupUser(event : Event): Promise<void> {

    event.preventDefault();

      if(!this.registerForm.valid) {
        const alert = this.alerController.create({
          message : 'Los campos del formulario son invalidos!', buttons : [{text: 'ok', role : 'cancel'}]
        });

        (await alert).present();
      }

      const user  = this.registerForm.value;

      const loading = await this.loadingController.create()
      this.autService.singup(user.email, user.password, user.name, user.lastname).then ( async ()=>{
        const alert = this.alerController.create({
          message : 'Registrado exitosamente!', 
          buttons : [{
            text: 'ok',
            handler: () => {
              this.registerForm.reset()
            }
        }]
      });
      
      (await alert).present();
        
      }, async error =>{
        const alert = this.alerController.create({
          message : error.message, buttons : [{text: 'ok', role : 'cancel'}]
        });

        (await alert).present();
      })
      .finally(() => {
        loading.dismiss()
      })
      
      loading.present()
  }

  // obtengo los datos de los campos del formulario
  get emailField(){
    return this.registerForm.get('email');
  }

  get passwordField(){
    return this.registerForm.get('password');
  }

  get nameField (){
    return this.registerForm.get('name');
  }

  get lastname (){
    return this.registerForm.get ('lastname');
  }
}
