import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TodoDetailsGuard } from './guards/todo-details/todo-details.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('@todo-app/todo-app/feature-list').then(
        (m) => m.TodoAppFeatureListModule
      ),
  },
  {
    path: ':id',
    loadChildren: () =>
      import('@todo-app/todo-app/feature-details').then(
        (m) => m.TodoAppFeatureDetailsModule
      ),
    canActivate: [TodoDetailsGuard]
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TodoAppFeatureShellModule {}
