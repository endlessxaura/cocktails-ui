import { Component, Input, OnInit } from '@angular/core';
import { Drink } from '../models/drink.model';

@Component({
    selector: 'cocktails-cocktail-card',
    templateUrl: './cocktail-card.component.html',
    styleUrls: ['./cocktail-card.component.scss']
})
export class CocktailCardComponent implements OnInit {

    // Interface Properties
    @Input() drink: Drink | null;
    @Input() navigable = true;

    // Local Properties

    // Constructor
    constructor() { }

    // Event Functions
    ngOnInit(): void {
    }

}
