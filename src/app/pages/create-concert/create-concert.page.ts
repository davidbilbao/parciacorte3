import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConcertService } from 'src/app/services/data/concert.service';

@Component({
  selector: 'app-create-concert',
  templateUrl: './create-concert.page.html',
  styleUrls: ['./create-concert.page.scss'],
})
export class CreateConcertPage implements OnInit {

  //FORMULARIO
  public createConcertForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private concertService: ConcertService,
    private alertController : AlertController,
    private location : Location
  ) {
    this.createConcertForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      cost: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async createConcert() {

    if (this.createConcertForm.invalid) {
      alert("Formulario no valido");
      return
    }

    const loading = await this.loadingController.create();

    const { name, date, price, cost } = this.createConcertForm.value

    this.concertService.createConcert(name, date.split('T')[0], price, cost)
    .then(() => {
      loading.dismiss()
        .then(() => {
          this.createConcertForm.reset();
          this.showSuccessMsg(name);
        });
    });

    await loading.present()
  }


  async showSuccessMsg(name: string) {

    const alert = await this.alertController.create({

      header: name + ' se agregó exitosamente',
      message: '¿Quieres agregar un nuevo concierto?',
      buttons: [
        {
          text: 'Mostrar todos los conciertos',
          handler: () => {
            this.location.back()
          }
        },
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            this.createConcertForm.reset()
          }
        }
      ]
    });
    await alert.present();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
