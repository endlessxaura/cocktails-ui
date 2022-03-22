import { NgModule } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from "@angular/common";

const commonModules = [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    CommonModule
];

@NgModule({
    imports: commonModules,
    exports: commonModules
})
export class SharedModule { }