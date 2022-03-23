import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared-module";
import { CocktailCardModule } from "../cocktail-card/cocktail-card.module";
import { CocktailService } from "../services/cocktail.service";
import { IngredientService } from "../services/ingredient.service";
import { CocktailDetailsRoutingModule } from "./cocktail-details-routing.module";
import { CocktailDetailsComponent } from "./cocktail-details.component";

@NgModule({
    declarations: [CocktailDetailsComponent],
    imports: [
        CocktailDetailsRoutingModule,
        SharedModule,
        CocktailCardModule
    ],
    providers: [
        CocktailService,
        IngredientService
    ]
})
export class CocktailDetailsModule { }