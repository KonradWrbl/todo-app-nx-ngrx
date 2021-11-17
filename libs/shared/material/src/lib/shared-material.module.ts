import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

const materialModules = [MatButtonModule, MatListModule, MatIconModule, MatDividerModule, MatCardModule]

@NgModule({
  imports: [CommonModule, ...materialModules],
  exports: [...materialModules],
})
export class SharedMaterialModule {}
