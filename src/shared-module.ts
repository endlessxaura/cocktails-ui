import { NgModule } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

const commonModules = [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatSelectModule
];

@NgModule({
    imports: commonModules,
    exports: commonModules
})
export class SharedModule { }