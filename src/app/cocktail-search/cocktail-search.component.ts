import { Component, OnInit } from '@angular/core';
import { DrinkFilter } from '../models/drink-filter.model';
import { Drink } from '../models/drink.model';
import { GlassListFilter } from '../models/glass-list-item.model';
import { IngredientListItem } from '../models/ingredient-list-item.model';
import { CocktailService } from '../services/cocktail.service';
import { IngredientService } from '../services/ingredient.service';

class CocktailSearchFilter {
    searchString: string | null = '';
    filterPrefix = '';
    drinks: DrinkFilter[] = [];
    options: string[] = [];
}

enum CocktailSearchFilterTypes {
    Ingredient = 'Ingredient',
    Glass = 'Glass',
    Category = 'Category',
    Alcholic = 'Alcoholic'
}

@Component({
    selector: 'cocktails-cocktail-search',
    templateUrl: './cocktail-search.component.html',
    styleUrls: ['./cocktail-search.component.scss']
})
export class CocktailSearchComponent implements OnInit {

    // Data Properties
    drinks: Drink[] = [];

    // Filter Properties
    name = '';
    searchFilters: { [type: string]: CocktailSearchFilter } = {
        [CocktailSearchFilterTypes.Ingredient]: {
            searchString: '',
            filterPrefix: 'i=',
            drinks: [],
            options: []
        },
        [CocktailSearchFilterTypes.Glass]: {
            searchString: '',
            filterPrefix: 'g=',
            drinks: [],
            options: []
        },
        [CocktailSearchFilterTypes.Category]: {
            searchString: '',
            filterPrefix: 'c=',
            drinks: [],
            options: []
        },
        [CocktailSearchFilterTypes.Alcholic]: {
            searchString: '',
            filterPrefix: 'a=',
            drinks: [],
            options: []
        }
    };
    searchFilterTypes = Object.keys(this.searchFilters);
    filteredDrinks: Drink[] = [];

    // Other Properties
    fetchTimeout: any = null;   // I'm not a fan of the "any" type, but Angular makes using NodeJS.Timeout difficult

    // Constructor
    constructor(
        private cocktailService: CocktailService,
        private ingredientService: IngredientService
    ) { }

    // Event Functions
    ngOnInit(): void {
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
