import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { SidebarComponent } from "../sidebar/sidebar.component";

import { LucideAngularModule, Menu } from "lucide-angular";

@Component({
  selector: 'app-layout',
  imports: [RouterModule, SidebarComponent, LucideAngularModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  readonly menuIcon = Menu;
}
