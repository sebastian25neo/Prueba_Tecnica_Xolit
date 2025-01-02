import { Component } from '@angular/core';
import { ApiService } from 'services/UserService';
import Swal from 'sweetalert2'; // Importar SweetAlert2

@Component({
  selector: 'app-card-user',
  templateUrl: './card-users.component.html',
})
export class CardUsersComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private apiService: ApiService) { }

  async onSubmit() {
    console.log('Formulario enviado');

    // Validar que todos los campos son requeridos
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos',
        text: 'Todos los campos son obligatorios. Por favor, complete el formulario.',
      });
      return; // Salir de la función si los campos no están completos
    }

    // Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
      });
      return;
    }

    const datosFormulario = {
      name: this.username,
      email: this.email,
      passwordHash: this.password
    };

    console.log('Datos del formulario:', datosFormulario);

    try {
      const respuesta = await this.apiService.enviarDatosFormulario(datosFormulario);
      console.log('Datos enviados exitosamente:', respuesta);

      // Verificar la respuesta y mostrar el swal
      if (respuesta.status === 'éxito') {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Usuario creado con éxito',
        }).then(() => {
          // Limpiar los datos del formulario
          this.username = '';
          this.email = '';
          this.password = '';
          this.confirmPassword = '';

          // Actualizar la tabla, por ejemplo, con un método de tu componente o servicio
          this.actualizarTabla();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al crear el usuario',
        });
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al enviar los datos',
      });
    }
  }

  // Método para actualizar la tabla (asumiendo que ya tienes una función de actualización)
  actualizarTabla() {
    // Aquí debes agregar la lógica para actualizar la tabla,
    // ya sea llamando a un servicio o actualizando los datos localmente
    console.log('Tabla actualizada');
  }
}
