import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-delivery-time',
  templateUrl: './delivery-time.component.html',
  styleUrls: ['./delivery-time.component.css']
})
export class DeliveryTimeComponent implements OnInit {

  formGeneral : FormGroup;

  formTiempoEntrega : FormGroup;
  errorFecha : boolean = false;
  errorOpcion : boolean = false;

  constructor(fb : FormBuilder, private router : Router, private activatedRoute : ActivatedRoute) { 
    this.formTiempoEntrega = fb.group( {
      fechaRadio : [''],
      fechaAElegir : [''],       
      fecha: [''],
      hora : ['']
    })    
    
    this.formGeneral = fb.group({
      formOrderDesc : ['']
    })

    this.formGeneral.controls['formOrderDesc'].setValue(history.state.form);

    console.log(this.formGeneral)

  }

  ngOnInit(): void {
  }

  updateForm(){ 
    this.errorFecha = false;
    this.errorOpcion = false;


    let controlesForm = this.formTiempoEntrega.controls;
    console.log(controlesForm['fechaRadio'].value );
    if(controlesForm['fechaRadio'].value === null || controlesForm['fechaRadio'].value === ''){
      this.errorOpcion = true;
      return;
    }


    if(controlesForm['fechaRadio'].value == 1 && this.isDateInvalid(controlesForm['fecha'].value, controlesForm['hora'].value) ) {
      this.errorFecha = true;
      return;
    }
  
    this.formGeneral.addControl('tiempoEntrega',this.formTiempoEntrega);  
    this.formGeneral.patchValue(this.formTiempoEntrega.value);    

    this.nextStep();

  }


  /**
   * Compara la fecha y hora enviadas con la fecha y hora actual.
   * Devuelve true si la fecha es menor que la actual o mayor que dentro de una semana.
 */
  isDateInvalid(fechaRecibida:any, horaRecibida:any) : boolean{
    let fechaComparacion = new Date();

    if(fechaRecibida == null || fechaRecibida === '' || horaRecibida == null || horaRecibida === ''){
      return true;
    }
    console.log(fechaRecibida)
    let fecha = new Date(fechaRecibida);
  
    if(fecha.getDate() < fechaComparacion.getDate() || fecha.getDate() >= (fechaComparacion.getDate() + 6)) {
      console.log("invalida2")
      return true;
    }
  
    return false;
    
  }


  nextStep(){
    console.log(this.formGeneral.controls)
    this.router.navigateByUrl('/location',
     {state: 
        {form: this.formGeneral.value,         
        }
      })

  }

  

}
