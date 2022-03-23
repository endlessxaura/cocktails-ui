import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared-module";
import { IngredientService } from "../services/ingredient.service";
import { IngredientSearchRoutingModule } from "./ingredient-search-routing.module";
import { IngredientSearchComponent } from "./ingredient-search.component";

@NgModule({
    declarations: [IngredientSearchComponent],
    imports: [
        IngredientSearchRoutingModule,
        SharedModule
    ],
    providers: [IngredientService]
})
export class IngredientSearchModule { }