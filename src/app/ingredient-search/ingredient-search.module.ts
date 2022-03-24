import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared-module";
import { CocktailService } from "../services/cocktail.service";
import { IngredientSearchRoutingModule } from "./ingredient-search-routing.module";
import { IngredientSearchComponent } from "./ingredient-search.component";

@NgModule({
    declarations: [IngredientSearchComponent],
    imports: [
        IngredientSearchRoutingModule,
        SharedModule
    ],
    providers: [CocktailService]
})
export class IngredientSearchModule { }