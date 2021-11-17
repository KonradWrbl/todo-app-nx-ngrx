import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { RouterModule, Routes } from '@angular/router';
import { TodoAppDataAccessModule } from '@todo-app/todo-app/data-access';
import { SharedMaterialModule } from '@todo-app/shared/material';

const routes: Routes = [
  {
    path: '',
    component: TodoDetailsComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), TodoAppDataAccessModule, SharedMaterialModule],
  declarations: [
    TodoDetailsComponent
  ],
})
export class TodoAppFeatureDetailsModule {}
