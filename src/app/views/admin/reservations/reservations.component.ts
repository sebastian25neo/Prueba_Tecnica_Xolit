import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: "app-reservations",
  templateUrl: "./reservations.component.html",
})
export class ReservationsComponent implements OnInit {
  constructor() {}

  @Output() reservationSaveds = new EventEmitter<void>(); 

  ngOnInit(): void {}

  onReservationSaved(): void {
    this.reservationSaveds.emit();  // Emitimos el evento cuando se guarda la reserva
    console.log('Nueva reserva guardada, actualizando tabla...');
    //this.fetchReservations(); // Volver a obtener los datos
  }
}
