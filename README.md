# CocktailsUI
CocktailsUI is a website built around the cocktails API: https://www.thecocktaildb.com/api.php. It was built with Angular 13.3.0.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Notes
- The cocktails API only returns 25 records with no obvious means of pagination.
- The "List all cocktails by first letter" endpoint doesn't return all of the cocktails. For instance, using "f=a" doesn't return the drink "Absolutely Fabulous," which you can find at ID 17224: www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17224. 
- Consequently, it's not feasible to pull down a complete list of all of the cocktails. I regarded this as a defect of the API and should be resolved at the level of the API. I didn't see it fit to resolve this on the front-end. Theoretically, I could permute a string (a -> aa -> aaa) for searching, going through the entire alphabet, and taking distinct results from result sets that include less than 25 results (which means I've exhausted that search) - but that'd be cumbersome and make the UI non-responsive.