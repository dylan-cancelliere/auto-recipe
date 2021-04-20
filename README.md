# auto-recipe
A webapp to help pick recipes based on what's already in your kitchen

## Setup
To run the app locally, follow these steps:
1. Clone the repo
2. `cd` into `{download location}/auto-recipe` and run `npm i`
3. `cd` into `auto-recipe/client` and run `npm i` again
4. Go back to the root directory `auto-recipe` and run `python3 ingredients_script.py`. This will scrape the [tasty.co](https://tasty.co/) website and generate a few text files. Note: you only need to run this once to generate the files, and it will take about 5-10 minutes depending on your machine
5. While still in the root directory, run `node server.js`
6. Open a new terminal, navigate to the root directory and run `npm start`
7. Open a browser of your choice and go to [localhost:3000](http://localhost:3000/)
8. That's it! The app should be set up and you can browse around to your heart's content

## Features
There's still a ton of work to be done on the app, so here's a list of all the currently implemented features as well as some features I'd like to implement (eventually).

Current features:
- [x] Python script to dynamically pull recipes and ingredients from [tasty.co](https://tasty.co/)
- [x] Algorithm to suggest recipes based on list of ingredients
- [x] MaterialUI card view with recipe details
- [x] User ID caching in browser cookies
- [x] Simple MaterialUI design

Eventual features:
- [ ] Better looking UI
- [ ] Pantry View
- [ ] Add shopping list to card view
- [ ] Ingredient selector
- [ ] 'Infinite' scrolling
- [ ] Keep track of recipes that a user tries
  - [ ] Recommend more recipes based on what the user liked
- [ ] Larger & more refined dataset
  - [ ] Pull data from more sites
- [ ] Properly hosted site, backend, and database instead of locally hosting
- [ ] Scheduled job to re-scrape pages
- [ ] Better login system
