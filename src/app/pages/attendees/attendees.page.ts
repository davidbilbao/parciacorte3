import { AlertController } from '@ionic/angular';
import { Attendee } from './../../interfaces/attendee';
import { LoadingController } from '@ionic/angular';
import { ConcertService } from 'src/app/services/data/concert.service';
import { Concert } from './../../interfaces/concert';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.page.html',
  styleUrls: ['./attendees.page.scss'],
})
export class AttendeesPage implements OnInit {

  concertId: string

  concert: Concert

  attendees: Attendee[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private concertService: ConcertService,
    private loadingController: LoadingController,
    private alertController :  AlertController
  ) {
    this.concertId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.getAll()
  }

  async getAll() {

    const [concert, attendees] = await Promise.all([
      this.concertService.get(this.concertId).get().toPromise(),
      this.concertService.getAttendees(this.concertId).get().toPromise()
    ])

    this.concert = concert.data()
    this.attendees = []
    attendees.forEach(attendee => {
      this.attendees.push(attendee.data())
      
    })
    
  }

  async deleteAttendee(attendeeId: string) {
    const alert = await this.alertController.create({

      header: `Eliminar ${name}...`,
      message: '¿Estas seguro que deseas eliminar este asistente del concierto? se restará el precio del concierto a las ganancias.',
      buttons: [
        {
          text: 'Eliminar',
          handler: async () => {
            const loading = await this.loadingController.create()
            this.concertService.deleteAttendee(this.concertId, attendeeId)
              .then(() => {
                this.getAll()
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
