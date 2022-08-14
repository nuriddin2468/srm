import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorsComponent } from './components/control-errors/control-errors.component';

const components = [
  ControlErrorsComponent
]

const accessors = [
  ...components
]

@NgModule({
  declarations: [
    ...accessors
    ],
  imports: [
    CommonModule
  ],
  exports: [
    ...accessors
  ]
})
export class SharedModule { }
