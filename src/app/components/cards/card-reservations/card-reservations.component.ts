import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { ApiService } from "services/UserService"; // Asegúrate de que la ruta del servicio sea correcta
import Swal from "sweetalert2";

@Component({
  selector: "card-reservations",
  templateUrl: "./card-reservations.component.html",
})
export class CardReservationsComponent implements OnInit {
  @Output() reservationSaved = new EventEmitter<void>();
  // Datos para los selects
  users: Array<{ id: number; name: string; email: string }> = [];
  resources: Array<{ id: number; name: string; description: string }> = [];
  selectedUser: number | null = null;
  selectedResource: number | null = null;

  // Datos adicionales
  startTime: string = "";
  endTime: string = "";
  status: string = ""; // Estado predeterminado
  minDate: string = ""; // Fecha mínima para los campos de fecha

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadResources();
    this.setMinDate(); // Establecer la fecha mínima al iniciar el componente
  }

  setMinDate(): void {
    const now = new Date();
    this.minDate = now.toISOString().split(".")[0]; // Formato YYYY-MM-DDTHH:MM:SS
  }

  async loadUsers() {
    try {
      this.users = await this.apiService.obtenerUsuarios();
      console.log("Usuarios cargados:", this.users);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los usuarios.",
      });
    }
  }

  async loadResources() {
    try {
      this.resources = await this.apiService.obtenerResources();
      console.log("Recursos cargados:", this.resources);
    } catch (error) {
      console.error("Error al cargar recursos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los recursos.",
      });
    }
  }

  async onSubmit() {
    console.log("Formulario enviado");

    this.reservationSaved.emit(); // Notificar al componente padre 

    // Validar que todos los campos son requeridos
    if (
      this.selectedUser === null ||
      this.selectedResource === null ||
      !this.startTime ||
      !this.endTime ||
      !this.status
    ) {
      Swal.fire({
        icon: "error",
        title: "Campos requeridos",
        text: "Todos los campos son obligatorios. Por favor, complete el formulario.",
      });
      return;
    }

    // Validar que la fecha de fin no sea anterior a la fecha de inicio
    const start = new Date(this.startTime);
    const end = new Date(this.endTime);

    if (end <= start) {
      Swal.fire({
        icon: "error",
        title: "Error en las fechas",
        text: "La fecha de fin debe ser posterior a la fecha de inicio.",
      });
      return;
    }

    // Convertir las fechas al formato requerido
    const formatDateToISO = (date: Date): string => {
      return date.toISOString().split(".")[0]; // Remueve la parte de milisegundos
    };

    const datosFormulario = {
      userId: +this.selectedUser,
      resourceId: +this.selectedResource,
      startTime: formatDateToISO(start),
      endTime: formatDateToISO(end),
      status: this.status,
    };
    console.log("Datos del formulario:", datosFormulario);

    try {
      const respuesta = await this.apiService.enviarDatosFormularioReservation(
        datosFormulario
      );

     // Notificar al componente padre

      // Mostrar mensaje de éxito
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Reserva creada con éxito",
      }).then(() => {

      

        // Limpiar los datos del formulario
        this.selectedUser = null;
        this.selectedResource = null;
        this.startTime = "";
        this.endTime = "";
        this.status = "";
       
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al enviar los datos",
      });
    }
  }
}
