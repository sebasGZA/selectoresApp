import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { PaisSmall, Pais } from '../../interfaces/paises.interface';
import { switchMap, tap, Observable } from 'rxjs';

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
    // frontera: [{value: '', disabled:true}, [Validators.required]]
    frontera: ['', [Validators.required]]

  })


  //Llenar selectores
  regiones: string[] = []
  paises: PaisSmall[] = []
  fronteras: string[] = []

  cargando: boolean = false

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
          this.cargando = true
          // this.miFormulario.get('frontera')?.disable()
        }),
        switchMap(region =>
          this.paisesSvc.getPaisesPorRegion(region)
        )
      )
      .subscribe(paises => {
        this.paises = paises
        this.cargando = false
      })

    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap(() => {
          this.fronteras = []
          this.miFormulario.get('frontera')?.reset('')
          this.cargando = true
          // this.miFormulario.get('frontera')?.enable()
        }),
        switchMap(cca2 =>
          this.paisesSvc.getPaisPorCCA2(cca2)
        )
      )
      .subscribe((pais) => {
        if (pais?.length > 0) {
          this.fronteras = pais[0]?.borders
        }
        this.cargando = false

      })

  }

  guardar() {
    console.log(this.miFormulario.value)
  }

}
