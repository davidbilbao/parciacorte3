import { AlertController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  formReset: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.formReset = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit() {
  }

  async reset() {
    if (this.formReset.invalid) {
      // alert
      return
    }

    const loading = await this.loadingController.create()

    const { email } = this.formReset.value

    this.authService.resetPassword(email)
    .then(async () => {
      this.formReset.reset()
      const alert = await this.alertController.create({
        message: `Se ha enviado un correo electronico a ${email} para reestablecer su contraseña.`,
        buttons: [{ text: 'ok', role: 'cancel' }]
      });

      alert.present()
    })
    .catch(async (error) => {
      console.log(error)
      const alert = await this.alertController.create({
        message: error,
        buttons: [{ text: 'ok', role: 'cancel' }]
      });
      alert.present()
    })
    .finally(() => {
      loading.dismiss()
    })

    loading.present()
  }

  get emailField() {
    return this.formReset.get('email');
  }

}
