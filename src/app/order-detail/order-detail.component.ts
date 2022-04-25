import { Component,Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  descripcion : string = "Descripción";
  imagen : any = "Acá va la imagen";
  tiempoRecepcion : string = "Tiempo de recepción";
  domicilioEntrega : string = "domicilio de entrega";
  domicilioBusqueda : string = "domicilio búsqueda";
  formaPago : string = "";

  constructor() {

    let form = history.state.form
        

    this.descripcion = form.formOrderDesc.descripcion;
    this.imagen = form.formOrderDesc.imagen;
    this.tiempoRecepcion = form.tiempoEntrega.fechaRadio === '0'? "Lo antes posible" : "Fecha: " + form.tiempoEntrega.fecha + " A las " + form.tiempoEntrega.hora;

    let formUbicaciones = form.formUbicaciones
    this.domicilioEntrega = formUbicaciones.domicilio.mapa == 'coordinates'? "Ver Mapa" : "Ciudad: "+ formUbicaciones.domicilio.ciudad + " Calle: " + formUbicaciones.domicilio.calle + formUbicaciones.domicilio.numeroCalle + " Referencia: " + formUbicaciones.domicilio.referencia;
    this.domicilioBusqueda = formUbicaciones.comercio.mapa == 'coordinates'? "Ver Mapa" : "Ciudad: "+ formUbicaciones.comercio.ciudad + " Calle: " + formUbicaciones.comercio.calle + formUbicaciones.comercio.numeroCalle + " Referencia: " + formUbicaciones.comercio.referencia;

    let formMetodoPago = form.formMetodoPago;
    this.formaPago = formMetodoPago.montoEfectivo? "Efectivo" : "Tarjeta"



   }

  ngOnInit(): void {
  }

  /**
   * Realiza la llamada al servidor
   */
  submit(){
    
  }


}
