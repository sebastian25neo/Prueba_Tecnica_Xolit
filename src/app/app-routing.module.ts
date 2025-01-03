import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";

import { UsersComponent } from "./views/admin/users/users.component";
import { ResourcesComponent } from "./views/admin/resources/resources.component";
import { ReservationsComponent } from "./views/admin/reservations/reservations.component";

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "users", component: UsersComponent },
      { path: "resources", component: ResourcesComponent },
      { path: "reservations", component: ReservationsComponent },
      { path: "", redirectTo: "users", pathMatch: "full" },
    ],
  },

  // Usar AdminComponent como layout para UsersComponent
  { path: "", component: AdminComponent, children: [{ path: "", component: UsersComponent }] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
