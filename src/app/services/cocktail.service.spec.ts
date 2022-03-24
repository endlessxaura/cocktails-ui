import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { AlcoholicListItem } from "../models/alcoholic-list-item.model";
import { AlcoholicList } from "../models/alcoholic-list.model";
import { CategoryListItem } from "../models/category-list-item.model";
import { CategoryList } from "../models/category-list.model";
import { DrinkFilters } from "../models/drink-filters.model";
import { Drink } from "../models/drink.model";
import { Drinks } from "../models/drinks.model";
import { GlassListFilter } from "../models/glass-list-item.model";
import { GlassList } from "../models/glass-list.model";
import { CocktailService } from "./cocktail.service";

describe('CocktailService', () => {
    let service: CocktailService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });
    });

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new CocktailService(httpClientSpy);
    });

    it('getCocktailById should return a Drink', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(of<Drinks>({
            drinks: [new Drink({ name: 'Hello', id: 'World' })]
        }));
        service.getCocktailById('World').subscribe(
            drink => {
                expect(drink).toBeTruthy();
                expect(drink).toBeInstanceOf(Drink);
                done();
            },
            () => {
                done.fail();
            }
        );
    });

    it('getCocktailById should handle null', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(of<Drinks>(new Drinks()));
        service.getCocktailById('World').subscribe(
            drink => {
                expect(drink).toBeNull();
                done();
            },
            () => {
                done.fail();
            }
        );
    });

    it('getCocktailsByName should return a Drinks', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(of<Drinks>(new Drinks()));
        service.getCocktailsByName('').subscribe(
            drinks => {
                expect(drinks).toBeTruthy();
                expect(drinks).toBeInstanceOf(Drinks);
                done();
            },
            () => {
                done.fail();
            }
        );
    });

    it('getCocktailsByFilter should return a DrinkFilters', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(of<DrinkFilters>(new DrinkFilters()));
        service.getCocktailsByFilter('filter').subscribe(
            drinks => {
                expect(drinks).toBeTruthy();
                expect(drinks).toBeInstanceOf(DrinkFilters);
                done();
            },
            () => {
                done.fail();
            }
        );
    });

    it('getGlasses should return a GlassList', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(of<GlassList>(new GlassList([
            new GlassListFilter('Hello'),
            new GlassListFilter('World')
        ])));
        service.getGlasses().subscribe(
            drinks => {
                expect(drinks).toBeTruthy();
                expect(drinks).toBeInstanceOf(GlassList);
                done();
            },
            () => {
                done.fail();
            }
        );
    });

    it('getCategories should return a CategoryList', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(of<CategoryList>(new CategoryList([
            new CategoryListItem('Hello'),
            new CategoryListItem('World')
        ])));
        service.getCategories().subscribe(
            drinks => {
                expect(drinks).toBeTruthy();
                expect(drinks).toBeInstanceOf(CategoryList);
                done();
            },
            () => {
                done.fail();
            }
        );
    });

    it('getAlcoholicOptions should return a AlcoholList', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(of<AlcoholicList>(new AlcoholicList([
            new AlcoholicListItem('Alcohol'),
            new AlcoholicListItem('No alcohol')
        ])));
        service.getAlcoholicOptions().subscribe(
            drinks => {
                expect(drinks).toBeTruthy();
                expect(drinks).toBeInstanceOf(AlcoholicList);
                done();
            },
            () => {
                done.fail();
            }
        );
    });
});