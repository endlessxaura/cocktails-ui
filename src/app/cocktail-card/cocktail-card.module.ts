import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/shared-module";
import { CocktailCardComponent } from "./cocktail-card.component";

@NgModule({
    declarations: [CocktailCardComponent],
    imports: [SharedModule, RouterModule],
    exports: [CocktailCardComponent]
})
export class CocktailCardModule { }