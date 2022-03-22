import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrinkIngredient } from '../models/drink-ingredient.model';
import { Drink } from '../models/drink.model';
import { CocktailDetailsService } from './cocktail-details.service';

@Component({
    selector: 'cocktails-cocktail-details',
    templateUrl: './cocktail-details.component.html',
    styleUrls: ['./cocktail-details.component.scss']
})
export class CocktailDetailsComponent implements OnInit {

    // Properties
    drink: Drink | null;
    drinkIngredients: DrinkIngredient[] = [];
    tags: string[] = [];

    // Constructor
    constructor(
        private route: ActivatedRoute,
        private cocktailDetailsService: CocktailDetailsService
    ) { }

    // Event Functions
    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.cocktailDetailsService.getCocktailById(params['id']).subscribe(drink => {
                    this.drink = drink;
                    if (this.drink) {
                        if (this.drink.strTags) {
                            this.tags = this.drink.strTags.split(',');
                        }
                        for (let i = 1; i <= 15; i++) {
                            const ingredient = this.drink['strIngredient' + i as keyof Drink];
                            const measure = this.drink['strMeasure' + i as keyof Drink];
                            if (ingredient) {
                                this.drinkIngredients.push(new DrinkIngredient(measure, ingredient));
                            }
                        }
                    }
                });
            }
        });
    }
}
