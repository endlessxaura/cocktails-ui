import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { IngredientService } from '../services/ingredient.service';
import * as sanitizeHtml from 'sanitize-html';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

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

    // Constructor
    constructor(
        private ingredientService: IngredientService,
        private activatedRoute: ActivatedRoute
    ) { }

    // Event Functions
    ngOnInit(): void {
        this.ingredientService.getIngredients().subscribe(ingredientList => {
            this.ingredients = ingredientList.drinks.map(drink => drink.strIngredient1);
        });
        this.activatedRoute.queryParams.pipe(take(1)).subscribe(queryParams => {
            if (queryParams['name']) {
                this.setIngredient(queryParams['name']);
            }
        });
    }

    setIngredient(newValue: string) {
        this.ingredientSelection = newValue;
        this.ingredientService.getIngredientByName(this.ingredientSelection).subscribe(ingredient => {
            this.ingredient = ingredient;
            if (this.ingredient) {
                this.ingredient.strDescription = sanitizeHtml(this.ingredient.strDescription);
            }
        });
    }
}
