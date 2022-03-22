import { NgModule } from "@angular/core";
import { IngredientSearchRoutingModule } from "./ingredient-search-routing.module";
import { IngredientSearchComponent } from "./ingredient-search.component";

@NgModule({
    declarations: [IngredientSearchComponent],
    imports: [IngredientSearchRoutingModule]
})
export class IngredientSearchModule { }