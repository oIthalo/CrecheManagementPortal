import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "", loadChildren: () => import("./pages/auth/auth.routes").then(x => x.AUTH_ROUTES) }
];
