import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'cocktails-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    // Properties

    // Constructor
    constructor(
        private router: Router
    ) { }

    get url() {
        return this.router.url;
    }

    // Event Functions
    ngOnInit(): void {
    }

    // UI Functions
    searchCocktailsClick() {
        // PRE: the user clicks on Search Cocktails
        // POST: changes the route to cocktail search
        this.router.navigateByUrl('/cocktail-search');
    }

    searchIngredientsClick() {
        // PRE: the user clicks on Search Ingredients
        // POST: changes the app state to ingredient search
        this.router.navigateByUrl('/ingredient-search');
    }
}
