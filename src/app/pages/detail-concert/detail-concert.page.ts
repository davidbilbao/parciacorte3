import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Concert } from 'src/app/interfaces/concert';
import { ConcertService } from 'src/app/services/data/concert.service';
import { Location } from '@angular/common';
import { Attendee } from 'src/app/interfaces/attendee';

@Component({
  selector: 'app-detail-concert',
  templateUrl: './detail-concert.page.html',
  styleUrls: ['./detail-concert.page.scss'],
})
export class DetailConcertPage implements OnInit {

  //ID DEL concierto
  public concertId: string;

  public concert : Observable<Concert>

  attendees : Attendee[] = []

  attendeeForm : FormGroup

  constructor(
    private activatedRoute : ActivatedRoute,
    private formBuilder : FormBuilder,
    private concertService : ConcertService,
    private loadingController : LoadingController,
    private authService : AuthService,
    private router : Router,
    private location : Location,
    private alertController : AlertController
  ) { 
    this.concertId  = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.attendeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
    })

    this.getDetail()

    this.concert.subscribe({
      next : (concert) => {
        if(concert){
          this.concertService.getAttendees(this.concertId)
          .get()
          .toPromise()
          .then((attendees) => {
            this.attendees = []
            attendees.forEach(attendee => {
              this.attendees.push(attendee.data())
            })
          })
        }
      }
    })
  }

  async getDetail(){
    this.concert = this.concertService.get(this.concertId).valueChanges()
  }

  async deleteConcert(){
    const alert = await this.alertController.create({

      header: `Eliminar ${name}...`,
      message: '¿Estas seguro que deseas eliminar este concierto? esta acción borrará los datos y sus asistentes.',
      buttons: [
        {
          text: 'Eliminar',
          handler: async () => {
            const loading = await this.loadingController.create()
            this.concertService.delete(this.concertId)
            .then(() => {
              this.location.back()
            })
            .finally(() => {
              loading.dismiss()
            })
            loading.present()
          }
        },
        {
          text: 'cancelar',
          role: 'cancel',
          handler: () => {
            return
          }
        }
      ]
    });
    await alert.present();
  }

  async addAttendee(){
    if (this.attendeeForm.invalid) {
      alert("Formulario no valido");
      return
    }

    const loading = await this.loadingController.create();

    const { name, lastname } = this.attendeeForm.value

    this.concertService.addAttende(name, lastname, this.concertId)
    .then(async () => {
      const alert = await this.alertController.create({
        header:'Asistente agregado exitosamente',
        buttons: [
          {
            text: 'Ok',
            role : 'cancel'
          }
        ]
      });
      await alert.present();
      this.attendeeForm.reset()
    })
    .finally(() => {
      loading.dismiss()
    })
    
    loading.present()
  }

  logout () : void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
