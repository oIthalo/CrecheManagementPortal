import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "", loadChildren: () => import("./components/components.routes").then(x => x.COMPONENTS_ROUTES) },
  { path: '**', component: NotFoundComponent }
];
