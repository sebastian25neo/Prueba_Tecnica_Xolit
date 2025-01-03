import { Component, OnInit } from "@angular/core";
import { ApiService } from 'services/UserService';
import Swal from "sweetalert2";

@Component({
  selector: "app-card-reservations-table",
  templateUrl: "./card-reservations-table.component.html",
})
export class TableReservationsComponent implements OnInit {
  reservations: any[] = []; // Variable para almacenar los datos obtenidos del backend

  constructor(private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    await this.fetchReservations(); // Llamar a la función para obtener los datos
  }

  // Obtener la lista de reservaciones desde el backend
  async fetchReservations(): Promise<void> {
    try {
      const response = await this.apiService.obtenerReservations();
      this.reservations = response; // Asignar los datos a la variable `reservations`
      console.log("reservaciones obtenidas:", this.reservations);
    } catch (error) {
      console.error("Error al obtener las reservaciones:", error);
    }
  }

  // Método para ser llamado desde el evento emitido
  onReservationSaved(newReservation: any) {
    // Agregar la nueva reserva al inicio del array
    this.reservations.unshift(newReservation);
  }

  // Eliminar una reservación por su ID
  async deleteReservation(reservationId: number): Promise<void> {
    console.log("Eliminar reservación con ID:", reservationId);
    
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const response = await this.apiService.eliminarReservation(reservationId);
        console.log("Reservación eliminada:", response);

        // Actualizar la lista de reservaciones después de la eliminación
        this.reservations = this.reservations.filter(reservation => reservation.id !== reservationId);

        Swal.fire('¡Eliminado!', 'La reservación ha sido eliminada.', 'success');
      } catch (error) {
        console.error("Error al eliminar la reservación:", error);
        Swal.fire('Error', 'Hubo un problema al eliminar la reservación.', 'error');
      }
    }
  }

  // Método para actualizar las reservas cuando se guarda una nueva

}
