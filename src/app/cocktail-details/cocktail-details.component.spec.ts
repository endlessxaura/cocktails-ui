import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SharedTestingModule } from 'src/shared-testing.module';
import { CocktailCardModule } from '../cocktail-card/cocktail-card.module';
import { CocktailService } from '../services/cocktail.service';
import { getTestCocktailService } from '../services/cocktail.service.spec';
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
                SharedTestingModule,
                CocktailCardModule,
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
        route.params = of({ id: '1' });
        fixture = TestBed.createComponent(CocktailDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
