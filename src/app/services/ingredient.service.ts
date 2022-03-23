import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { IngredientList } from "../models/integredient-list.model";

@Injectable()
export class IngredientService {

    // Constructor
    constructor(private httpClient: HttpClient) { }

    // Callable Methods
    getIngredients(): Observable<IngredientList> {
        return this.httpClient.get<IngredientList>('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list').pipe(take(1));
    }
}