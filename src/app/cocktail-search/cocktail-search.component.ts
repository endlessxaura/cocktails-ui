import { Component, OnInit } from '@angular/core';
import { DrinkFilter } from '../models/drink-filter.model';
import { Drink } from '../models/drink.model';
import { GlassFilter } from '../models/glass-filter.model';
import { IngredientListItem } from '../models/ingredient-list-item.model';
import { CocktailService } from '../services/cocktail.service';
import { IngredientService } from '../services/ingredient.service';

@Component({
    selector: 'cocktails-cocktail-search',
    templateUrl: './cocktail-search.component.html',
    styleUrls: ['./cocktail-search.component.scss']
})
export class CocktailSearchComponent implements OnInit {

    // Data Properties
    drinks: Drink[] = [];
    ingredients: IngredientListItem[] = [];
    glasses: GlassFilter[] = [];
    drinksByIngredient: DrinkFilter[] = [];
    drinksByGlass: DrinkFilter[] = [];

    // Local Properties
    name = '';
    ingredientSearch = '';
    glassSearch = '';
    filteredDrinks: Drink[] = [];
    fetchTimeout: any = null;   // I'm not a fan of the "any" type, but Angular makes using NodeJS.Timeout difficult

    // Constructor
    constructor(
        private cocktailService: CocktailService,
        private ingredientService: IngredientService
    ) { }

    // Event Functions
    ngOnInit(): void {
        this.ingredientService.getIngredients().subscribe(ingredientList => {
            this.ingredients = ingredientList.drinks;
        });
        this.cocktailService.getGlasses().subscribe(glassFilters => {
            this.glasses = glassFilters.drinks;
        })
        this.fetchCocktails();
    }

    // UI Functions
    queueRefetch() {
        // PRE: the user makes some change to the search parameters
        // POST: queues are refresh that will execute so long as nothing else does
        if (this.fetchTimeout) {
            clearTimeout(this.fetchTimeout);
        }
        this.fetchTimeout = setTimeout(() => {
            this.fetchCocktails();
        }, 1000);
    }

    applyIngredientFilter() {
        // PRE: the user changes the ingredient search
        // POST: obtains that filter and applies it
        if (this.ingredientSearch) {
            this.cocktailService.getCocktailFilterByIngredient(this.ingredientSearch).subscribe(drinksContainer => {
                this.drinksByIngredient = drinksContainer.drinks;
                this.applyFilter();
            });
        } else {
            this.drinksByIngredient = [];
            this.applyFilter();
        }
    }

    applyGlassFilter() {
        if (this.glassSearch) {
            this.cocktailService.getCocktailFilterByGlass(this.glassSearch).subscribe(drinksContainer => {
                this.drinksByGlass = drinksContainer.drinks;
                this.applyFilter();
            });
        } else {
            this.drinksByGlass = [];
            this.applyFilter();
        }
    }

    // Internal Methods
    private fetchCocktails() {
        // POST: obtains the data for the grid
        this.cocktailService.getCocktailsByName(this.name).subscribe(drinksContainer => {
            this.drinks = drinksContainer.drinks;
            this.applyFilter();
        });
        if (this.fetchTimeout) {
            clearTimeout(this.fetchTimeout);
            this.fetchTimeout = null;
        }
    }

    private applyFilter() {
        // POST: crosses the filter with the data
        this.filteredDrinks = this.drinks.filter(drink => {

            // Checking the ingredient filter
            if (
                this.drinksByIngredient
                && this.drinksByIngredient.length > 0
                && !this.drinksByIngredient.find(drinkByIngredient => drinkByIngredient.idDrink == drink.idDrink)
            ) {
                return false;
            }

            // Checking the glass filter
            if (
                this.drinksByGlass
                && this.drinksByGlass.length > 0
                && !this.drinksByGlass.find(drinkByGlass => drinkByGlass.idDrink == drink.idDrink)
            ) {
                return false;
            }

            // If we've passed all filters, then we can include the drink
            return true;
        });
    }
}
