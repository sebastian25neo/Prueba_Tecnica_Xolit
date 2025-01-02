import { Component } from '@angular/core';
import { ApiService } from 'services/UserService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-resources',
  templateUrl: './card-resources.component.html',
})
export class CardResourcesComponent {
  name: string = '';
  description: string = '';
  capacity: number | null = null;
  is_active: boolean = true;

  constructor(private apiService: ApiService) { }

  async onSubmit() {
    console.log('Formulario enviado');

    // Validar que todos los campos son requeridos
    if (!this.name || !this.description || this.capacity === null || this.is_active === undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos',
        text: 'Todos los campos son obligatorios. Por favor, complete el formulario.',
      });
      return;
    }

    const datosFormulario = {
      name: this.name,
      description: this.description,
      capacity: this.capacity,
      is_active: this.is_active,
    };


    try {
      const respuesta = await this.apiService.enviarDatosFormularioResource(datosFormulario);

      // Mostrar mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Recurso creado con éxito',
      }).then(() => {
        // Limpiar los datos del formulario
        this.name = '';
        this.description = '';
        this.capacity = null;
        this.is_active = true;
      });
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al enviar los datos',
      });
    }
  }
}
