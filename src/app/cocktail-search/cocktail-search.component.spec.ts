import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedTestingModule } from 'src/shared-testing.module';
import { CocktailCardModule } from '../cocktail-card/cocktail-card.module';
import { CocktailService } from '../services/cocktail.service';
import { getTestCocktailService, testDrinks } from '../services/cocktail.service.spec';
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
                SharedTestingModule,
                CocktailCardModule,
                RouterTestingModule
            ],
            providers: [
                { provide: CocktailService, useValue: getTestCocktailService() }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CocktailSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.drinks = testDrinks.drinks;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should filter drinks with name', waitForAsync(() => {
        component.setFilterByName = jasmine.createSpy('setFilterByName', component.setFilterByName).and.callThrough();
        const nameField = fixture.debugElement.query(By.css('#nameField'));
        expect(nameField).toBeTruthy();
        if (nameField) {
            nameField.triggerEventHandler('ngModelChange', 'A');
            nameField.triggerEventHandler('keydown', {});
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(component.setFilterByName).toHaveBeenCalled();
                expect(component.filteredDrinks.length).toEqual(1);
            });
        }
    }));

    it('should filter drinks with dropdowns', waitForAsync(() => {
        const setFilterByTypeSpy = spyOn(component, 'setFilterByType').and.callThrough();
        component.searchFilterTypes.forEach(filterType => {
            const searchField = fixture.debugElement.query(By.css('#searchField' + filterType));
            expect(searchField).toBeTruthy();
            const searchFilter = component.searchFilters[filterType];
            expect(searchFilter).toBeTruthy();
            if (searchField && searchFilter) {
                expect(searchFilter.options.length).toBeGreaterThan(0);
                if (searchFilter.options.length > 0) {
                    searchField.triggerEventHandler('ngModelChange', searchFilter.options[0]);
                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        expect(setFilterByTypeSpy).toHaveBeenCalledWith(filterType, searchFilter.options[0]);
                        expect(component.filteredDrinks.length).toEqual(1);
                    });
                }
            }
        });
    }));

    it('should allow blank dropdown filters', waitForAsync(() => {
        const setFilterByTypeSpy = spyOn(component, 'setFilterByType').and.callThrough();
        component.searchFilterTypes.forEach(filterType => {
            const searchField = fixture.debugElement.query(By.css('#searchField' + filterType));
            expect(searchField).toBeTruthy();
            const searchFilter = component.searchFilters[filterType];
            expect(searchFilter).toBeTruthy();
            searchField.triggerEventHandler('ngModelChange', '');
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(setFilterByTypeSpy).toHaveBeenCalledWith(filterType, '');
                expect(component.filteredDrinks.length).toEqual(2);
            });
        });
    }));
});
