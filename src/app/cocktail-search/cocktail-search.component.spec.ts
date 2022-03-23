import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/shared-module';
import { CocktailCardModule } from '../cocktail-card/cocktail-card.module';
import { CocktailService, getTestCocktailService } from '../services/cocktail.service';
import { IngredientService } from '../services/ingredient.service';
import { CocktailSearchRoutingModule } from './cocktail-search-routing.module';

import { CocktailSearchComponent } from './cocktail-search.component';

describe('CocktailSearchComponent', () => {
    let component: CocktailSearchComponent;
    let fixture: ComponentFixture<CocktailSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CocktailSearchComponent],
            imports: [
                CocktailSearchRoutingModule,
                SharedModule,
                CocktailCardModule
            ],
            providers: [
                { provide: CocktailService, useValue: getTestCocktailService() },
                IngredientService
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CocktailSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
