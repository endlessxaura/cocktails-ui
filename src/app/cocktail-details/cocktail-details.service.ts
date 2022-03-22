import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, take } from "rxjs";
import { Drink } from "../models/drink.model";
import { Drinks } from "../models/drinks.model.ts";

@Injectable()
export class CocktailDetailsService {

    // Constructor
    constructor(
        private httpClient: HttpClient
    ) { }

    // Http Methods
    getCocktailById(id: string): Observable<Drink | null> {
        return this.httpClient.get<Drinks>('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id).pipe(
            take(1),
            map((drinksContainer: Drinks) =>
                drinksContainer.drinks.length > 0 ? drinksContainer.drinks[0] : null
            )
        );
    }
}