import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, take } from "rxjs";
import { Ingredient } from "../models/ingredient.model";
import { Ingredients } from "../models/ingredients.model";
import { IngredientList } from "../models/integredient-list.model";

@Injectable()
export class IngredientService {

    // Constructor
    constructor(private httpClient: HttpClient) { }

    // Callable Methods
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