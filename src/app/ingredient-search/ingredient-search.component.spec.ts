import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/shared-module';
import { IngredientService } from '../services/ingredient.service';
import { IngredientSearchRoutingModule } from './ingredient-search-routing.module';

import { IngredientSearchComponent } from './ingredient-search.component';

describe('IngredientSearchComponent', () => {
    let component: IngredientSearchComponent;
    let fixture: ComponentFixture<IngredientSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IngredientSearchComponent],
            imports: [
                IngredientSearchRoutingModule,
                SharedModule
            ],
            providers: [IngredientService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IngredientSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
