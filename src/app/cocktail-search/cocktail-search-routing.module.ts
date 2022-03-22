import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CocktailSearchComponent } from "./cocktail-search.component";

const routes: Routes = [
    {
        path: '',
        component: CocktailSearchComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CocktailSearchRoutingModule { }