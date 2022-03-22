import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IngredientSearchComponent } from "./ingredient-search.component";

const routes: Routes = [
    {
        path: '',
        component: IngredientSearchComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IngredientSearchRoutingModule { }