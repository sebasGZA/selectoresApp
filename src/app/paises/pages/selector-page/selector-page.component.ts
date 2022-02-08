import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilderSvc.group({
    region: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    frontera: ['', [Validators.required]]
  })

  //Llenar selectores
  regiones: string[] = []
  paises: PaisSmall[] = []
  fronteras: string[] = []

  constructor(private formBuilderSvc: FormBuilder, private paisesSvc: PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.paisesSvc.regiones

    //Cuando cambie region
    // this.miFormulario.get('region')?.valueChanges.subscribe(region => {
    //   this.paisesSvc.getPaisesPorRegion(region).subscribe(paises => {
    //     console.log(paises)
    //     this.paises = paises
    //   })
    // })

    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap(() => {
          this.miFormulario.get('pais')?.reset('')
        }),
        switchMap(region =>
          this.paisesSvc.getPaisesPorRegion(region)
        )
      )
      .subscribe(paises => {
        this.paises = paises
      })

      this.miFormulario.get('pais')?.valueChanges
      .subscribe(paisCode => {
        console.log(paisCode)
      })

  }

  guardar() {
    console.log(this.miFormulario.value)
  }

}
