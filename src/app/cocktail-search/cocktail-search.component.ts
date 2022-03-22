import { Component, OnInit } from '@angular/core';
import { Drink } from '../models/drink.model';
import { CocktailSearchService } from './cocktail-search.service';

@Component({
    selector: 'cocktails-cocktail-search',
    templateUrl: './cocktail-search.component.html',
    styleUrls: ['./cocktail-search.component.scss']
})
export class CocktailSearchComponent implements OnInit {

    // Properties
    drinks: Drink[] = [];
    name = '';
    fetchTimeout: any = null;   // I'm not a fan of the "any" type, but Angular makes using NodeJS.Timeout difficult

    // Constructor
    constructor(private cocktailSearchService: CocktailSearchService) { }

    // Event Functions
    ngOnInit(): void {
        this.fetchData();
    }

    // UI Functions
    queueRefetch() {
        // PRE: the user makes some change to the search parameters
        // POST: queues are refresh that will execute so long as nothing else does
        if (this.fetchTimeout) {
            clearTimeout(this.fetchTimeout);
        }
        this.fetchTimeout = setTimeout(() => {
            this.fetchData();
        }, 1000);
    }

    // Internal Methods
    private fetchData() {
        this.cocktailSearchService.getCocktailsByName(this.name).subscribe(drinksContainer => {
            this.drinks = drinksContainer.drinks;
        });
        if (this.fetchTimeout) {
            clearTimeout(this.fetchTimeout);
            this.fetchTimeout = null;
        }
    }
}
