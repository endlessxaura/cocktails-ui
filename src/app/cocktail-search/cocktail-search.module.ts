import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared-module";
import { CocktailCardModule } from "../cocktail-card/cocktail-card.module";
import { CocktailSearchRoutingModule } from "./cocktail-search-routing.module";
import { CocktailSearchComponent } from "./cocktail-search.component";
import { CocktailSearchService } from "./cocktail-search.service";

@NgModule({
    declarations: [CocktailSearchComponent],
    imports: [
        CocktailSearchRoutingModule,
        SharedModule,
        CocktailCardModule
    ],
    providers: [
        CocktailSearchService
    ]
})
export class CocktailSearchModule { }