import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from 'services/UserService';

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  users: any[] = []; // Variable para almacenar los datos obtenidos del backend

  constructor(private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    await this.fetchUsers(); // Llamar a la función para obtener los datos
  }

  async fetchUsers(): Promise<void> {
    try {
      const response = await this.apiService.obtenerUsuarios();
      this.users = response; // Asignar los datos a la variable `users`
    console.log("Usuarios obtenidos:", this.users);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  }
}
