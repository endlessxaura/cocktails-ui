import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SharedModule } from 'src/shared-module';
import { CocktailCardModule } from '../cocktail-card/cocktail-card.module';
import { CocktailService, getTestCocktailService } from '../services/cocktail.service';
import { getTestIngredientService, IngredientService } from '../services/ingredient.service';
import { CocktailDetailsRoutingModule } from './cocktail-details-routing.module';

import { CocktailDetailsComponent } from './cocktail-details.component';

describe('CocktailDetailsComponent', () => {
    let component: CocktailDetailsComponent;
    let fixture: ComponentFixture<CocktailDetailsComponent>;
    let route: ActivatedRoute;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CocktailDetailsComponent],
            imports: [
                CocktailDetailsRoutingModule,
                SharedModule,
                CocktailCardModule
            ],
            providers: [
                { provide: CocktailService, useValue: getTestCocktailService() },
                { provide: IngredientService, useValue: getTestIngredientService() }
            ]
        })
            .compileComponents();
        route = <ActivatedRoute>TestBed.get(ActivatedRoute);
    });

    beforeEach(() => {
        route.params = of({ id: '1' });
        fixture = TestBed.createComponent(CocktailDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
