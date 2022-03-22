import { NgModule } from "@angular/core";
import { CocktailSearchRoutingModule } from "./cocktail-search-routing.module";
import { CocktailSearchComponent } from "./cocktail-search.component";

@NgModule({
    declarations: [CocktailSearchComponent],
    imports: [CocktailSearchRoutingModule]
})
export class CocktailSearchModule { }