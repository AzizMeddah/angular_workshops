import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    UsersListComponent
  ]
})
export class UsersModule { }
