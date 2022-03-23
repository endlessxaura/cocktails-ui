import { Component, OnInit } from '@angular/core';
import { DrinkFilter } from '../models/drink-filter.model';
import { Drink } from '../models/drink.model';
import { GlassListFilter } from '../models/glass-list-item.model';
import { IngredientListItem } from '../models/ingredient-list-item.model';
import { CocktailService } from '../services/cocktail.service';
import { IngredientService } from '../services/ingredient.service';
import { CocktailSearchFilter, CocktailSearchFilterTypes } from './cocktail-search-filter.model';

@Component({
    selector: 'cocktails-cocktail-search',
    templateUrl: './cocktail-search.component.html',
    styleUrls: ['./cocktail-search.component.scss']
})
export class CocktailSearchComponent implements OnInit {

    // Data Properties
    drinks: Drink[] = [];

    // Filter Properties
    searchFilterTypes: string[] = [];
    filteredDrinks: Drink[] = [];

    // Other Properties
    fetchTimeout: any = null;   // I'm not a fan of the "any" type, but Angular makes using NodeJS.Timeout difficult

    // Constructor
    constructor(
        private cocktailService: CocktailService,
        private ingredientService: IngredientService
    ) { }

    get nameFilter() {
        return this.cocktailService.nameFilter;
    }

    set nameFilter(value: string) {
        this.cocktailService.nameFilter = value;
    }

    get searchFilters(): { [type: string]: CocktailSearchFilter } {
        return this.cocktailService.searchFilters;
    }

    set searchFilters(value: { [type: string]: CocktailSearchFilter }) {
        this.cocktailService.searchFilters = value;
    }

    // Event Functions
    ngOnInit(): void {
        this.searchFilterTypes = Object.keys(this.searchFilters);
        this.ingredientService.getIngredients().subscribe(ingredientList => {
            this.searchFilters[CocktailSearchFilterTypes.Ingredient].options = ingredientList.drinks.map(drink => drink.strIngredient1);
        });
        this.cocktailService.getGlasses().subscribe(glassList => {
            this.searchFilters[CocktailSearchFilterTypes.Glass].options = glassList.drinks.map(drink => drink.strGlass);
        });
        this.cocktailService.getCategories().subscribe(categoryList => {
            this.searchFilters[CocktailSearchFilterTypes.Category].options = categoryList.drinks.map(drink => drink.strCategory);
        });
        this.cocktailService.getAlcoholicOptions().subscribe(alcoholicList => {
            this.searchFilters[CocktailSearchFilterTypes.Alcholic].options = alcoholicList.drinks.map(drink => drink.strAlcoholic);
        });
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

    fetchCocktails() {
        // POST: obtains the data for the grid
        this.cocktailService.getCocktailsByName(this.nameFilter).subscribe(drinksContainer => {
            if (drinksContainer && drinksContainer.drinks) {
                this.drinks = drinksContainer.drinks;
            } else {
                this.drinks = [];
            }
            this.applyFilter();
        });
        if (this.fetchTimeout) {
            clearTimeout(this.fetchTimeout);
            this.fetchTimeout = null;
        }
    }

    setFilterByType(type: string, newValue: string) {
        this.searchFilters[type].searchString = newValue;
        if (this.searchFilters[type].searchString) {
            this.cocktailService.getCocktailsByFilter(this.searchFilters[type].filterPrefix + this.searchFilters[type].searchString).subscribe(drinksContainer => {
                this.searchFilters[type].drinks = drinksContainer.drinks;
                this.applyFilter();
            });
        } else {
            this.searchFilters[type].drinks = [];
            this.applyFilter();
        }
    }

    // Internal Methods
    private applyFilter() {
        // POST: crosses the filter with the data
        this.filteredDrinks = this.drinks.filter(drink => {
            for (let i = 0; i < this.searchFilterTypes.length; i++) {
                const searchFilterType = this.searchFilterTypes[i];
                if (
                    this.searchFilters[searchFilterType].drinks
                    && this.searchFilters[searchFilterType].drinks.length > 0
                    && !this.searchFilters[searchFilterType].drinks.find(filterDrink => filterDrink.idDrink == drink.idDrink)
                ) {
                    return false;
                }
            }
            return true;
        });
    }
}
