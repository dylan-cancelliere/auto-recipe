# auto-recipe
A webapp to help pick recipes based on what's already in your kitchen

## Setup
To run the app locally, follow these steps:
1. Clone the repo
2. `cd` into `{download location}/auto-recipe` and run `npm i`
3. `cd` into `auto-recipe/client` and run `npm i` again
4. Go back to the root directory `auto-recipe` and run `py ingredients_script.py`. This will scrape the [tasty.co](https://tasty.co/) website and generate a few text files. Note: you only need to run this once to generate the files, and it will take about 5-10 minutes depending on your machine
5. While still in the root directory, run `node server.js`
6. Open a new terminal, navigate to the root directory and run `npm start`
7. Open a browser of your choice and go to [localhost:3000](http://localhost:3000/)
8. That's it! The app should be set up and you can browse around to your heart's content
