import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilderSvc.group({
    region: ['', [Validators.required]]
  })

  //Llenar selectores
  regiones: string[] = []

  constructor(private formBuilderSvc: FormBuilder, private paisesSvc: PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.paisesSvc.regiones
  }

  guardar() {
    console.log(this.miFormulario.value)
  }

}
