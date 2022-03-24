# CocktailsUI
CocktailsUI a website built on Angular 13.3.0. It is available at https://cocktails-ui.herokuapp.com/. It is a website built around the cocktails API: https://www.thecocktaildb.com/api.php. 

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Notes
- I spent about 18 hours on this project: 4 hours on 3/21/22, 4 hours on 3/22/22, and 6 hours on 3/23/22. All of these were after 8-hour work days.
- The cocktails API's "Search cocktail by name" endpoint only returns 25 records with no obvious means of pagination.
- The "List all cocktails by first letter" endpoint doesn't return all of the cocktails. For instance, using "f=a" doesn't return the drink "Absolutely Fabulous," which you can find at ID 17224: www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17224. 
- Consequently, I had to do something very strange to pull down a workable list of cocktails. I iterated through all of the possible filter options and extracted all of the values. I make a distinct list of their union and use that as my data source.
- I would prefer to do it this way: a paginated GET endpoint that takes a number of search parameters returns a list of drinks. Whenever the user changes the search parameters or changes the page, it reobtains the data set. If the page the user is on is no longer valid, it resets the page to the last valid page.
- I would have implemented pagination or virtualization on the main page, but I ran out of time. In particular, it took me a while to figure out a way to pull down a more complete data set and, by the time it was useful, I'd been near the end of the test.
- I have never actually done unit testing before. I've understood it conceptually and have been pushing my product team at Tyler to adopt it, but they're resistant to change, even though we have dozens of regressions every release. The technology took me a while to learn, but once I got the hang of Jasmine and Karma, it was quite enjoyable to write.