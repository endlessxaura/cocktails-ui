import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared-module";
import { CocktailCardModule } from "../cocktail-card/cocktail-card.module";
import { CocktailDetailsRoutingModule } from "./cocktail-details-routing.module";
import { CocktailDetailsComponent } from "./cocktail-details.component";
import { CocktailDetailsService } from "./cocktail-details.service";

@NgModule({
    declarations: [CocktailDetailsComponent],
    imports: [
        CocktailDetailsRoutingModule,
        SharedModule,
        HttpClientModule,
        CocktailCardModule
    ],
    providers: [CocktailDetailsService]
})
export class CocktailDetailsModule { }