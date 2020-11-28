import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrationComponent } from "./registration/registration.component";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { MainComponent } from "./main/main.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "login", component: AuthorizationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
