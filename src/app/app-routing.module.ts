import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrationComponent } from "./registration/registration.component";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { PetitionListComponent } from "./petition-list/petition-list.component";
import { PetitionItemComponent} from "./petition-item/petition-item.component";
import { MainComponent } from "./main/main.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "login", component: AuthorizationComponent },
  { path: "petition-list", component: PetitionListComponent },
  { path: "petition-item/:id", component: PetitionItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
