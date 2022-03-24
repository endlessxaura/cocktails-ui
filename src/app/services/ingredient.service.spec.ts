import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { IngredientListItem } from "../models/ingredient-list-item.model";
import { Ingredient } from "../models/ingredient.model";
import { Ingredients } from "../models/ingredients.model";
import { IngredientList } from "../models/integredient-list.model";
import { IngredientService } from "./ingredient.service";

describe('IngredientService', () => {
    let service: IngredientService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });
    });

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new IngredientService(httpClientSpy);
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
});