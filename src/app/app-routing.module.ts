import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'cocktail-search',
        loadChildren: () => import('./cocktail-search/cocktail-search.module').then(m => m.CocktailSearchModule)
    },
    {
        path: 'ingredient-search',
        loadChildren: () => import('./ingredient-search/ingredient-search.module').then(m => m.IngredientSearchModule)
    },
    {
        path: 'cocktail-details',
        loadChildren: () => import('./cocktail-details/cocktail-details.module').then(m => m.CocktailDetailsModule)
    },
    {
        path: '**',
        redirectTo: '/cocktail-search'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
