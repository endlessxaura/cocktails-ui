import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared-module";
import { CocktailCardComponent } from "./cocktail-card.component";

@NgModule({
    declarations: [CocktailCardComponent],
    imports: [SharedModule],
    exports: [CocktailCardComponent]
})
export class CocktailCardModule { }