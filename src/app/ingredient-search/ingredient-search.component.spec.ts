import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SharedTestingModule } from 'src/shared-testing.module';
import { CocktailService } from '../services/cocktail.service';
import { getTestCocktailService } from '../services/cocktail.service.spec';
import { IngredientSearchRoutingModule } from './ingredient-search-routing.module';

import { IngredientSearchComponent } from './ingredient-search.component';

describe('IngredientSearchComponent', () => {
    let component: IngredientSearchComponent;
    let fixture: ComponentFixture<IngredientSearchComponent>;
    let route: ActivatedRoute;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IngredientSearchComponent],
            imports: [
                IngredientSearchRoutingModule,
                SharedTestingModule,
                RouterTestingModule
            ],
            providers: [
                { provide: CocktailService, useValue: getTestCocktailService() }
            ]
        })
            .compileComponents();
        route = <ActivatedRoute>TestBed.get(ActivatedRoute);
    });

    beforeEach(() => {
        route.queryParams = of({ name: 'Hello!' });
        fixture = TestBed.createComponent(IngredientSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
