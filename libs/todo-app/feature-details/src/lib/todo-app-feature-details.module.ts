import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TodoDetailsComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    TodoDetailsComponent
  ],
})
export class TodoAppFeatureDetailsModule {}
