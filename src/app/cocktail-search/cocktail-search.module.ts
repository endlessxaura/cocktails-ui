import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared-module";
import { CocktailCardModule } from "../cocktail-card/cocktail-card.module";
import { CocktailService } from "../services/cocktail.service";
import { IngredientService } from "../services/ingredient.service";
import { CocktailSearchRoutingModule } from "./cocktail-search-routing.module";
import { CocktailSearchComponent } from "./cocktail-search.component";

@NgModule({
    declarations: [CocktailSearchComponent],
    imports: [
        CocktailSearchRoutingModule,
        SharedModule,
        CocktailCardModule
    ],
    providers: [
        CocktailService,
        IngredientService
    ]
})
export class CocktailSearchModule { }