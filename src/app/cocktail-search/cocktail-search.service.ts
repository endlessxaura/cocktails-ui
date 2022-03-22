import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { Drink } from "../models/drink.model";
import { Drinks } from "../models/drinks.model.ts";

@Injectable()
export class CocktailSearchService {

    // Properties
    drinks: Drink[] = [];

    // Constructor
    constructor(private httpClient: HttpClient) { }

    // Callable Methods
    getCocktailsByName(name: string): Observable<Drinks> {
        return this.httpClient.get<Drinks>('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name).pipe(take(1));
    }
}