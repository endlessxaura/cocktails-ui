import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of, take } from "rxjs";
import { CocktailSearchFilter, CocktailSearchFilterTypes } from "../cocktail-search/cocktail-search-filter.model";
import { AlcoholicList } from "../models/alcoholic-list.model";
import { CategoryList } from "../models/category-list.model";
import { DrinkFilter } from "../models/drink-filter.model";
import { DrinkFilters } from "../models/drink-filters.model";
import { Drink } from "../models/drink.model";
import { Drinks } from "../models/drinks.model";
import { GlassList } from "../models/glass-list.model";
import { Ingredient } from "../models/ingredient.model";
import { Ingredients } from "../models/ingredients.model";
import { IngredientList } from "../models/integredient-list.model";

@Injectable({
    providedIn: 'root'
})
export class CocktailService {

    // State Properties
    drinkFilters: BehaviorSubject<DrinkFilter[]> = new BehaviorSubject([] as DrinkFilter[]);
    nameFilter = '';
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

    // Constructor
    constructor(
        private httpClient: HttpClient
    ) { }

    // Callable Methods
    setDistinctFilters(drinkFilters: DrinkFilters) {
        const allValues = this.drinkFilters.value.concat(drinkFilters.drinks);
        const distinctValues = allValues.filter((value: DrinkFilter, index: number, arr: DrinkFilter[]) => {
            const firstIndex = arr.findIndex(arrValue => arrValue.idDrink == value.idDrink);
            return firstIndex == index;
        });
        distinctValues.sort((a, b) => a.strDrink.localeCompare(b.strDrink));
        this.drinkFilters.next(distinctValues);
    }

    getAllDrinkFilters() {
        this.drinkFilters.next([]);

        // Setting by categories
        this.getCategories().subscribe(categories => {
            categories.drinks.forEach(category => {
                this.getCocktailsByFilter('c=' + category.strCategory).subscribe(drinkFilters => {
                    this.setDistinctFilters(drinkFilters)
                })
            });
        });

        // Setting by glasses
        this.getGlasses().subscribe(glasses => {
            glasses.drinks.forEach(glass => {
                this.getCocktailsByFilter('g=' + glass.strGlass).subscribe(drinkFilters => {
                    this.setDistinctFilters(drinkFilters)
                })
            })
        });

        // Setting by alcoholic options
        this.getAlcoholicOptions().subscribe(alcoholicOptions => {
            alcoholicOptions.drinks.forEach(alcoholicOption => {
                this.getCocktailsByFilter('a=' + alcoholicOption.strAlcoholic).subscribe(drinkFilters => {
                    this.setDistinctFilters(drinkFilters)
                })
            });
        });

        // Setting by ingredients
        this.getIngredients().subscribe(ingredients => {
            ingredients.drinks.forEach(ingredient => {
                this.getCocktailsByFilter('i=' + ingredient.strIngredient1).subscribe(drinkFilters => {
                    this.setDistinctFilters(drinkFilters)
                });
            });
        });
    }

    // Http Methods
    getCocktailById(id: string): Observable<Drink | null> {
        return this.httpClient.get<Drinks>('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id).pipe(
            take(1),
            map((drinksContainer: Drinks) =>
                drinksContainer.drinks.length > 0 ? drinksContainer.drinks[0] : null
            )
        );
    }

    getCocktailsByName(name: string): Observable<Drinks | null> {
        return this.httpClient.get<Drinks>('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name).pipe(take(1));
    }

    getCocktailsByFilter(filter: string): Observable<DrinkFilters> {
        return this.httpClient.get<DrinkFilters>('https://www.thecocktaildb.com/api/json/v1/1/filter.php?' + filter).pipe(take(1));
    }

    getGlasses(): Observable<GlassList> {
        return this.httpClient.get<GlassList>('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list').pipe(
            take(1),
            map(glassList => {
                glassList.drinks.sort((a, b) => a.strGlass.localeCompare(b.strGlass));
                return glassList;
            })
        );
    }

    getCategories(): Observable<CategoryList> {
        return this.httpClient.get<CategoryList>('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').pipe(
            take(1),
            map(categoryList => {
                categoryList.drinks.sort((a, b) => a.strCategory.localeCompare(b.strCategory));
                return categoryList;
            })
        );
    }

    getAlcoholicOptions(): Observable<AlcoholicList> {
        return this.httpClient.get<AlcoholicList>('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list').pipe(
            take(1),
            map(alcoholList => {
                alcoholList.drinks.sort((a, b) => a.strAlcoholic.localeCompare(b.strAlcoholic));
                return alcoholList;
            })
        );
    }

    getIngredients(): Observable<IngredientList> {
        return this.httpClient.get<IngredientList>('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list').pipe(
            take(1),
            map(ingredientList => {
                ingredientList.drinks.sort((a, b) => a.strIngredient1.localeCompare(b.strIngredient1));
                return ingredientList;
            })
        );
    }

    getIngredientByName(name: string): Observable<Ingredient | null> {
        return this.httpClient.get<Ingredients>('https://www.thecocktaildb.com/api/json/v1/1/search.php?i=' + name).pipe(
            take(1),
            map((ingredientsContainer: Ingredients) =>
                ingredientsContainer.ingredients && ingredientsContainer.ingredients.length > 0 ? ingredientsContainer.ingredients[0] : null
            )
        )
    }
}