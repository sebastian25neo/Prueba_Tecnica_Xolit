import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "services/UserService";

@Component({
  selector: "app-card-table-resource",
  templateUrl: "./card-table.component.html",
})
export class TableResourcesComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  resources: any[] = []; // Variable para almacenar los datos de recursos obtenidos del backend

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.fetchResources(); // Llamar a la función para obtener los datos de recursos
  }

  async fetchResources(): Promise<void> {
    try {
      const response = await this.apiService.obtenerResources();
      this.resources = response.map((resource: any) => ({
        name: resource.name,
        description: resource.description,
        capacity: resource.capacity,
        is_active: resource.is_active,
      })); // Mapear los datos del backend a la estructura requerida
    } catch (error) {
      console.error("Error al obtener los recursos:", error);
    }
  }
}
