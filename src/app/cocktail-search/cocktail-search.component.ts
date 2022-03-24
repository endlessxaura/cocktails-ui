import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrinkFilter } from '../models/drink-filter.model';
import { CocktailService } from '../services/cocktail.service';
import { CocktailSearchFilter, CocktailSearchFilterTypes } from './cocktail-search-filter.model';

@Component({
    selector: 'cocktails-cocktail-search',
    templateUrl: './cocktail-search.component.html',
    styleUrls: ['./cocktail-search.component.scss']
})
export class CocktailSearchComponent implements OnInit, OnDestroy {

    // Properties
    searchFilterTypes: string[] = [];
    drinks: DrinkFilter[] = [];
    drinkFilterSubscription: Subscription;
    filteredDrinks: DrinkFilter[] = [];
    fetchTimeout: any = null;   // I'm not a fan of the "any" type, but Angular makes using NodeJS.Timeout difficult

    // Constructor
    constructor(
        private cocktailService: CocktailService
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

    // Event Functions
    ngOnInit(): void {
        this.searchFilterTypes = Object.keys(this.searchFilters);
        this.cocktailService.getIngredients().subscribe(ingredientList => {
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
        this.drinkFilterSubscription = this.cocktailService.drinkFilters.subscribe(drinkFilters => {
            this.drinks = drinkFilters;
            this.applyFilter();
        });
        if (this.cocktailService.drinkFilters.value.length == 0) {
            this.cocktailService.getAllDrinkFilters();
        }
    }

    ngOnDestroy(): void {
        this.drinkFilterSubscription.unsubscribe();
    }

    // UI Functions
    setFilterByName(newValue: string) {
        this.nameFilter = newValue;
        this.applyFilter();
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
            if (this.nameFilter && !drink.strDrink.includes(this.nameFilter)) {
                return false;
            }
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
