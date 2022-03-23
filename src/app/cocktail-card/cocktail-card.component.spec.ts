import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/shared-module';

import { CocktailCardComponent } from './cocktail-card.component';

describe('CocktailCardComponent', () => {
    let component: CocktailCardComponent;
    let fixture: ComponentFixture<CocktailCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CocktailCardComponent],
            imports: [SharedModule, RouterTestingModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CocktailCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
