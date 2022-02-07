import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilderSvc: FormBuilder) { }

  ngOnInit(): void {
  }

  guardar() {
    console.log(this.miFormulario.value)
  }

}
