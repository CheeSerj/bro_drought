import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroughtComponent } from './pages/drought/drought.component';
import {ButtonModule} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [DroughtComponent],
  exports: [DroughtComponent],
  imports: [CommonModule, ButtonModule, InputTextareaModule, FormsModule, InputTextModule]
})
export class DroughtTimelineModule {}
