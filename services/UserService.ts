import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Variable global para la URL base de la API
  private baseUrl: string = 'http://localhost:8080';

  constructor() { }

   async obtenerUsuarios(): Promise<any> {
    try {
      // Usar la variable baseUrl para la URL completa
      const respuesta = await axios.get(`${this.baseUrl}/api/users`);
      return respuesta.data;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
   } 

  async enviarDatosFormulario(datos: any): Promise<any> {
    try {
      // Usar la variable baseUrl para la URL completa
      const respuesta = await axios.post(`${this.baseUrl}/api/users`, datos);
      return respuesta.data;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }

  async obtenerResources(): Promise<any> {
    try {
      // Usar la variable baseUrl para la URL completa
      const respuesta = await axios.get(`${this.baseUrl}/api/resources`);
      return respuesta.data;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw error;
    }
   } 

  async enviarDatosFormularioResource(datos: any): Promise<any> {
    try {
      // Usar la variable baseUrl para la URL completa
      const respuesta = await axios.post(`${this.baseUrl}/api/resources`, datos);
      return respuesta.data;
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      throw error;
    }
  }
}
