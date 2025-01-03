import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  //creamos un formulario reactivo. OJO A CÓMO SE HACE
  public heroForm = new FormGroup(
    {
      id: new FormControl<string>(''),
      superhero: new FormControl<string>('', { nonNullable: true }),
      publisher: new FormControl<Publisher>(Publisher.DCComics),
      alter_ego: new FormControl(''),
      first_appearance: new FormControl(''),
      characters: new FormControl(''),
      alt_img: new FormControl(''),
    }
  );

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private readonly heroesService: HeroesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackbar: MatSnackBar,
    private readonly dialog: MatDialog) { }

  //desde aquí verificamos si estamos editando un personaje
  //para cargar sus datos en tal caso
  ngOnInit(): void {
    //primero verificamos si estamos editando o no un superhéroe
    if (!this.router.url.includes('edit')) return; //si no estamos editando, se sale
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      ).subscribe(hero => {
        if (!hero) return this.router.navigateByUrl('/');
        //el reset hace dos cosas, regresa al formulario a su valor original,
        //y, si le mandamos un argumento, establece todos los valores con
        //los nombres _binding_ con los que coincida en el formulario
        //y es exactamente como están, tal cual se reciben del backend
        this.heroForm.reset(hero);
        return;
      }
      );
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  //método que nos servirá para actualizar héroe si estamos en uno existente
  //o crear uno nuevo si pasamos una id que no existe
  onSubmit(): void {
    //los formularios reactivos tienen una propiedad para ver si son o no válidos
    //en caso de que no sea válido, el método sale sin hacer nada
    if (this.heroForm.invalid) return;

    //si existe, lo actualizamos
    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnanckbar(`${hero.superhero} succesfully updated`);
        }
        );
      return;
    }

    //si no existe, lo creamos
    this.heroesService.addHero(this.currentHero)
      .subscribe(hero => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnanckbar(`${hero.superhero} succesfully created`);
      }
      );
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigate(['/heroes']);
      });
  }

  showSnanckbar(message: string): void {
    this.snackbar.open(message, 'done',
      { duration: 2500 }
    );
  }
}
