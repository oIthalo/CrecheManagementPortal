import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "dashboard" },
  { path: "", loadChildren: () => import("./components/auth/auth.routes").then(x => x.AUTH_ROUTES) },
  { path: "", loadChildren: () => import("./components/creches/creches.routes").then(x => x.CRECHES_ROUTES) }
];
