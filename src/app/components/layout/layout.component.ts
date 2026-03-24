import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";

import { LucideAngularModule, Menu } from "lucide-angular";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ButtonNavComponent } from "../botton-nav/botton-nav.component";

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    LucideAngularModule,
    SidebarComponent,
    ButtonNavComponent
],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  readonly menuIcon = Menu;
}
