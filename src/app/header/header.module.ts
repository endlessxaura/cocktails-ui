import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header.component";
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [HeaderComponent],
    imports: [MatButtonModule],
    exports: [HeaderComponent]
})
export class HeaderModule {}