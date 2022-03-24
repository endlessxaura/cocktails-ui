import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, take } from 'rxjs';
import { DrinkIngredient } from '../models/drink-ingredient.model';
import { Drink } from '../models/drink.model';
import { CocktailService } from '../services/cocktail.service';

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
        private cocktailService: CocktailService
    ) { }

    // Event Functions
    ngOnInit(): void {
        this.route.params.pipe(take(1)).subscribe(params => {
            if (params['id']) {
                forkJoin(
                    this.cocktailService.getCocktailById(params['id']),
                    this.cocktailService.getIngredients()
                ).subscribe(results => {
                    this.drink = results[0];
                    const ingredients = results[1].drinks.map(drink => drink.strIngredient1);
                    if (this.drink) {
                        if (this.drink.strTags) {
                            this.tags = this.drink.strTags.split(',');
                        }
                        for (let i = 1; i <= 15; i++) {
                            const ingredient = this.drink['strIngredient' + i as keyof Drink];
                            const measure = this.drink['strMeasure' + i as keyof Drink];
                            if (ingredient) {
                                this.drinkIngredients.push(
                                    new DrinkIngredient(
                                        measure,
                                        ingredient,
                                        ingredients.includes(ingredient)
                                    )
                                );
                            }
                        }
                    }
                });
            }
        });
    }
}
