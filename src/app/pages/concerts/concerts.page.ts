import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Concert } from 'src/app/interfaces/concert';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConcertService } from 'src/app/services/data/concert.service';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.page.html',
  styleUrls: ['./concerts.page.scss'],
})
export class ConcertsPage implements OnInit {

  concerts: Concert[] = []

  constructor(
    private loadingController : LoadingController,
    private alertController : AlertController,
    private concertService : ConcertService,
    private authService : AuthService,
    private router : Router,
    private activatedRoute : ActivatedRoute
  ) {
    this.activatedRoute.params
    .subscribe(() => {
      this.getAll()
    })
  }

  ngOnInit() {
    if(this.concerts.length <= 0){
      return
    }
    this.getAll()
  }

  async getAll(){
    const loading = await this.loadingController.create()
    this.concerts = []
    this.concertService.getAll()
    .get()
    .toPromise()
    .then(res =>{
      res.forEach(concert => {
        this.concerts.push(concert.data())
      })      
    })
    .finally(() => {
      loading.dismiss()
    })

    loading.present()
  }

  async delete({id, name}: Concert){
    const alert = await this.alertController.create({

      header: `Eliminar ${name}...`,
      message: '¿Estas seguro que deseas eliminar este concierto? esta acción borrará los datos y sus asistentes.',
      buttons: [
        {
          text: 'Eliminar',
          handler: async () => {
            const loading = await this.loadingController.create()
            this.concertService.delete(id)
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


  logout () : void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
