import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SharedModule } from 'src/shared-module';
import { getTestIngredientService, IngredientService } from '../services/ingredient.service';
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
                SharedModule
            ],
            providers: [
                { provide: IngredientService, useValue: getTestIngredientService() }
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
