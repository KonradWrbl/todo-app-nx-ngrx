import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedMaterialModule } from '@todo-app/shared/material';

const routes: Routes = [{ path: '', component: TodoItemComponent }];

@NgModule({
  imports: [CommonModule, SharedMaterialModule],
  declarations: [TodoItemComponent],
  exports: [TodoItemComponent],
})
export class TodoAppUiListModule {}
