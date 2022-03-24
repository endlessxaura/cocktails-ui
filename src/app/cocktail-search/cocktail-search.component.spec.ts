import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/shared-module';
import { CocktailCardModule } from '../cocktail-card/cocktail-card.module';
import { CocktailService, getTestCocktailService } from '../services/cocktail.service';
import { getTestIngredientService, IngredientService } from '../services/ingredient.service';
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
                { provide: IngredientService, useValue: getTestIngredientService() }
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

    it('should fetch new drinks on enter', waitForAsync(() => {
        const nameField = fixture.debugElement.query(By.css('#nameField'));
        expect(nameField).toBeTruthy();
        if (nameField) {
            component.queueRefetch = jasmine.createSpy('queueRefetch', component.queueRefetch).and.callThrough();
            component.fetchCocktails = jasmine.createSpy('fetchCocktails', component.fetchCocktails).and.callThrough();
            nameField.triggerEventHandler('ngModelChange', 'search');
            nameField.triggerEventHandler('keydown', {});
            fixture.detectChanges();
            nameField.triggerEventHandler('ngModelChange', 'search');
            nameField.triggerEventHandler('keydown', {});
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(component.queueRefetch).toHaveBeenCalledTimes(2);
                nameField.triggerEventHandler('keyup.enter', {});
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(component.fetchCocktails).toHaveBeenCalled();
                });
            });
        }
    }));

    it('should fetch new drinks on waiting', waitForAsync(() => {
        const nameField = fixture.debugElement.query(By.css('#nameField'));
        expect(nameField).toBeTruthy();
        if (nameField) {
            component.fetchCocktails = jasmine.createSpy('fetchCocktails', component.fetchCocktails);
            nameField.triggerEventHandler('ngModelChange', 'search');
            nameField.triggerEventHandler('keydown', {});
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                setTimeout(() => {
                    expect(component.fetchCocktails).toHaveBeenCalled();
                }, 3000)
            });
        }
    }));

    it('should filter drinks', waitForAsync(() => {
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
                        expect(searchFilter.drinks.length).toEqual(1);
                        expect(component.filteredDrinks.length).toEqual(1);
                    });
                }
            }
        });
    }));

    it('should allow blank filters', waitForAsync(() => {
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
                expect(searchFilter.drinks.length).toEqual(0);
                expect(component.filteredDrinks.length).toEqual(2);
            });
        });
    }));
});
