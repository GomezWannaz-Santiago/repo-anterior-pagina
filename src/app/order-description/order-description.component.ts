import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-order-description',
  templateUrl: './order-description.component.html',
  styleUrls: ['./order-description.component.css']
})
export class OrderDescriptionComponent implements OnInit {

  @Input() formGeneral : any = "";
  orderDescForm : FormGroup ;
  errorDesc       : boolean = false;
  errorImagen : boolean = false;

  constructor(fb : FormBuilder, private router : Router) {
    this.orderDescForm = fb.group({
      descripcion : [''],
      imagen : ['']
    })
    console.log(this.formGeneral)
   }

  ngOnInit(): void {
  }

  updateForm(){ 
    this.errorDesc = false;

    let largoDesc = this.orderDescForm.controls['descripcion'].value.length
    if(largoDesc > 50 || largoDesc < 1) {
      this.sendError()
      return;
    }
  
    this.formGeneral.addControl('orderDesc',this.orderDescForm);  
    this.formGeneral.patchValue(this.orderDescForm.value);

    this.nextStep();

  }

  sendError() {
    this.errorDesc = true;
  }

  verifyImageType(){
    this.errorImagen = false;
        
    let imagen = this.orderDescForm.controls['imagen'].value;    
    if( imagen != null && ! (imagen.slice(-3).toUpperCase() === "JPG")){
      this.errorImagen = true;
      this.orderDescForm.controls['imagen'].setValue(null);
    }
  }

  nextStep(){
    if(this.errorDesc || this.errorImagen || this.orderDescForm.controls['descripcion'].pristine) {
      console.log("error")
      return;
    }

    this.router.navigateByUrl('/delivery-time', {state: {form: this.formGeneral.controls['orderDesc'].value}})

  }

}
