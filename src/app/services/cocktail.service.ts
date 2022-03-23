import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, take } from "rxjs";
import { CategoryList } from "../models/category-list.model";
import { DrinkFilters } from "../models/drink-filters.model";
import { Drink } from "../models/drink.model";
import { Drinks } from "../models/drinks.model";
import { GlassList } from "../models/glass-list.model";

@Injectable()
export class CocktailService {

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

    getCocktailsByName(name: string): Observable<Drinks> {
        return this.httpClient.get<Drinks>('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name).pipe(take(1));
    }

    getCocktailsByFilter(filter: string): Observable<DrinkFilters> {
        return this.httpClient.get<DrinkFilters>('https://www.thecocktaildb.com/api/json/v1/1/filter.php?' + filter).pipe(take(1));
    }

    getGlasses(): Observable<GlassList> {
        return this.httpClient.get<GlassList>('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list').pipe(take(1));
    }

    getCategories(): Observable<CategoryList> {
        return this.httpClient.get<CategoryList>('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').pipe(take(1));
    }
}