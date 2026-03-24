import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { CrecheResponse } from '../../responses/creche/creche.response';
import { SidebarComponent } from "../sidebar/sidebar.component";
import {
  LucideAngularModule,
  School,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-angular';

@Component({
  selector: 'app-creches',
  imports: [
    LucideAngularModule,
    CommonModule,
    RouterModule
],
  templateUrl: './creches.component.html'
})
export class CrechesComponent {
  readonly schoolIcon = School
  readonly phoneIcon = Phone
  readonly mapPinIcon = MapPin
  readonly arrowRightIcon = ArrowRight

  creches: CrecheResponse[] = [
    {
      identifier: 'crch_001',
      name: 'Creche Pequenos Sonhos',
      email: 'contato@pequenossonhos.com',
      contactNumber: '(75) 99123-4567',
      address: {
        street: 'Rua das Flores',
        number: '120',
        city: 'Santo Antônio de Jesus',
        state: 'BA'
      }
    },
    {
      identifier: 'crch_002',
      name: 'Centro Infantil Mundo Feliz',
      email: 'mundo.feliz@email.com',
      contactNumber: '(75) 98876-3321',
      address: {
        street: 'Av. Luís Viana',
        number: '45',
        city: 'Santo Antônio de Jesus',
        state: 'BA'
      }
    }
  ]
}
