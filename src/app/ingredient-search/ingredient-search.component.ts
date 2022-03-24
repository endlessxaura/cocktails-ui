import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import * as sanitizeHtml from 'sanitize-html';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { CocktailService } from '../services/cocktail.service';

@Component({
    selector: 'cocktails-ingredient-search',
    templateUrl: './ingredient-search.component.html',
    styleUrls: ['./ingredient-search.component.scss']
})
export class IngredientSearchComponent implements OnInit {

    // Properties
    ingredients: string[] = [];
    ingredientSelection = '';
    ingredient: Ingredient | null;
    drinkId = false;

    // Constructor
    constructor(
        private cocktailService: CocktailService,
        private activatedRoute: ActivatedRoute
    ) { }

    // Event Functions
    ngOnInit(): void {
        this.cocktailService.getIngredients().subscribe(ingredientList => {
            this.ingredients = ingredientList.drinks.map(drink => drink.strIngredient1);
        });
        this.activatedRoute.queryParams.pipe(take(1)).subscribe(queryParams => {
            if (queryParams['name']) {
                this.setIngredient(queryParams['name']);
            }
            if (queryParams['drinkId']) {
                this.drinkId = queryParams['drinkId'];
            }
        });
    }

    // Helper Functions
    setIngredient(newValue: string) {
        this.ingredientSelection = newValue;
        this.cocktailService.getIngredientByName(this.ingredientSelection).subscribe(ingredient => {
            this.ingredient = ingredient;
            if (this.ingredient) {
                this.ingredient.strDescription = sanitizeHtml(this.ingredient.strDescription);
            }
        });
    }
}
