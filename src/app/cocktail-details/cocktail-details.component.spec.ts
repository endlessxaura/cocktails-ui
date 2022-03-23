import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/shared-module';
import { CocktailCardModule } from '../cocktail-card/cocktail-card.module';
import { CocktailService } from '../services/cocktail.service';
import { IngredientService } from '../services/ingredient.service';
import { CocktailDetailsRoutingModule } from './cocktail-details-routing.module';

import { CocktailDetailsComponent } from './cocktail-details.component';

describe('CocktailDetailsComponent', () => {
    let component: CocktailDetailsComponent;
    let fixture: ComponentFixture<CocktailDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CocktailDetailsComponent],
            imports: [
                CocktailDetailsRoutingModule,
                SharedModule,
                CocktailCardModule
            ],
            providers: [
                CocktailService,
                IngredientService
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CocktailDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
