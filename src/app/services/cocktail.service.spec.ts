import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CocktailSearchFilterTypes } from "../cocktail-search/cocktail-search-filter.model";
import { AlcoholicListItem } from "../models/alcoholic-list-item.model";
import { AlcoholicList } from "../models/alcoholic-list.model";
import { CategoryListItem } from "../models/category-list-item.model";
import { CategoryList } from "../models/category-list.model";
import { DrinkFilter } from "../models/drink-filter.model";
import { DrinkFilters } from "../models/drink-filters.model";
import { Drink } from "../models/drink.model";
import { Drinks } from "../models/drinks.model";
import { GlassListFilter } from "../models/glass-list-item.model";
import { GlassList } from "../models/glass-list.model";
import { IngredientListItem } from "../models/ingredient-list-item.model";
import { Ingredient } from "../models/ingredient.model";
import { Ingredients } from "../models/ingredients.model";
import { IngredientList } from "../models/integredient-list.model";
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

    it('getIngredients should return an IngredientList', (done: DoneFn) => {
        httpClientSpy.get.and.returnValues(of(new IngredientList([
            new IngredientListItem('Hello'),
            new IngredientListItem('World')
        ])));
        service.getIngredients().subscribe(
            ingredients => {
                expect(ingredients).toBeTruthy();
                expect(ingredients).toBeInstanceOf(IngredientList);
                done();
            },
            () => {
                done.fail();
            }
        )
    });

    it('getIngredientByName should return an Ingredient', (done: DoneFn) => {
        httpClientSpy.get.and.returnValues(of(new Ingredients([new Ingredient()])));
        service.getIngredientByName('name').subscribe(
            ingredient => {
                expect(ingredient).toBeTruthy();
                expect(ingredient).toBeInstanceOf(Ingredient);
                done();
            },
            () => {
                done.fail();
            }
        )
    });

    it('getIngredientsByName should handle null', (done: DoneFn) => {
        httpClientSpy.get.and.returnValues(of(new Ingredients()));
        service.getIngredientByName('name').subscribe(
            ingredient => {
                expect(ingredient).toBeNull();
                done();
            },
            () => {
                done.fail();
            }
        )
    });

    it('should get distinct filters', waitForAsync(() => {
        const testingCocktailService = getTestCocktailService();
        service.getCategories = testingCocktailService.getCategories;
        service.getIngredients = testingCocktailService.getIngredients;
        service.getGlasses = testingCocktailService.getGlasses;
        service.getAlcoholicOptions = testingCocktailService.getAlcoholicOptions;
        service.getCocktailsByFilter = testingCocktailService.getCocktailsByFilter;
        service.getAllDrinkFilters();
        expect(service.getCategories).toHaveBeenCalled();
        expect(service.getIngredients).toHaveBeenCalled();
        expect(service.getGlasses).toHaveBeenCalled();
        expect(service.getAlcoholicOptions).toHaveBeenCalled();
        expect(service.getCocktailsByFilter).toHaveBeenCalled();
    }));
});

export const testDrinks: Drinks = {
    drinks: [
        new Drink({
            id: 'drink A',
            name: 'Drink of A',
            category: 'category A',
            alcoholic: 'alcoholic',
            glass: 'glass A',
            ingredients: ['ingredient A'],
            measures: ['1/2'],
            tags: 'Test,Tag'
        }),
        new Drink({
            id: 'drink B',
            name: 'Drink of B',
            category: 'category B',
            alcoholic: 'non-alcoholic',
            glass: 'glass B',
            ingredients: ['ingredient B'],
            measures: ['1/2'],
            tags: 'Woo,Hoo'
        })
    ]
};

export const getTestCocktailService = () => {
    const testCocktailService = jasmine.createSpyObj(
        'CocktailService',
        [
            'getCocktailsByName',
            'getCocktailById',
            'getCocktailsByFilter',
            'getGlasses',
            'getCategories',
            'getAlcoholicOptions',
            'getIngredients',
            'getIngredientByName',
            'getAllDrinkFilters'
        ],
        {
            drinkFilters: new BehaviorSubject([] as DrinkFilter[]),
            searchFilters: {
                [CocktailSearchFilterTypes.Ingredient]: {
                    searchString: '',
                    filterPrefix: 'i=',
                    drinks: [],
                    options: []
                },
                [CocktailSearchFilterTypes.Glass]: {
                    searchString: '',
                    filterPrefix: 'g=',
                    drinks: [],
                    options: []
                },
                [CocktailSearchFilterTypes.Category]: {
                    searchString: '',
                    filterPrefix: 'c=',
                    drinks: [],
                    options: []
                },
                [CocktailSearchFilterTypes.Alcholic]: {
                    searchString: '',
                    filterPrefix: 'a=',
                    drinks: [],
                    options: []
                }
            }
        }
    );
    testCocktailService.getCocktailsByName.and.returnValue(
        of<Drinks>(testDrinks)
    );
    testCocktailService.getCocktailById.and.returnValue(
        of<Drink>(testDrinks.drinks[0])
    );
    testCocktailService.getCocktailsByFilter.and.returnValue(
        of<DrinkFilters>({
            drinks: [
                {
                    strDrink: testDrinks.drinks[0].strDrink,
                    strDrinkThumb: 'Eh',
                    idDrink: testDrinks.drinks[0].idDrink
                }
            ]
        })
    );
    testCocktailService.getGlasses.and.returnValue(
        of<GlassList>({
            drinks: [
                {
                    strGlass: 'glass A'
                },
                {
                    strGlass: 'glass B'
                }
            ]
        })
    );
    testCocktailService.getCategories.and.returnValue(
        of<CategoryList>({
            drinks: [
                {
                    strCategory: 'category A'
                },
                {
                    strCategory: 'category B'
                }
            ]
        })
    );
    testCocktailService.getAlcoholicOptions.and.returnValue(
        of<AlcoholicList>({
            drinks: [
                {
                    strAlcoholic: 'alcoholic'
                },
                {
                    strAlcoholic: 'non-alcoholic'
                }
            ]
        })
    );
    testCocktailService.getIngredients.and.returnValue(
        of<IngredientList>({
            drinks: [
                {
                    strIngredient1: 'Ingredient A'
                },
                {
                    strIngredient1: 'Ingredient B'
                }
            ]
        })
    );
    testCocktailService.getIngredientByName.and.returnValue(
        of<Ingredients>({
            ingredients: [
                {
                    idIngredient: 'Ingredient A',
                    strIngredient: 'A',
                    strDescription: 'description here',
                    strType: 'alcohol?',
                    strAlcohol: 'yes?',
                    strABV: 'sure?'
                },
                {
                    idIngredient: 'Ingredient B',
                    strIngredient: 'B',
                    strDescription: 'description here',
                    strType: 'non-alcohol?',
                    strAlcohol: 'no?',
                    strABV: 'maybe not?'
                }
            ]
        })
    );
    return testCocktailService;
};