import ast
import json
import re
import requests


def has_numbers(string):
    return any(char.isdigit() for char in string)

# Not currently used
def update_ingredients():
    url = 'https://world.openfoodfacts.org/ingredients.json'
    food = set()
    data = requests.get(url).json()
    for item in data['tags']:
        item = item['name']
        if ':' not in item and not has_numbers(item):
            food.add(item.lower())
    with open('ingredients_list.txt', 'w') as file:
        file.write(str(food))
    print('Done!')


# Algorithm credits to https://gist.github.com/mbrzusto/23fe728966247f25f3ec
def recipes_raw_to_json(filename):
    file_read = open(filename)
    file_write = open('tasty_recipes_json.txt', 'w')

    for line in file_read:
        json_dat = json.dumps(ast.literal_eval(line))
        dict_dat = json.loads(json_dat)
        json.dump(dict_dat, file_write)
        file_write.write("\n")
    print('Recipes raw to JSON finished')


def read_file_to_set(filename):
    with open(filename, 'r') as file:
        data = set(file.read()[1:-1].replace("'", "").split(', '))
        return data


def tasty_ingredient_scraper():
    url = 'https://tasty.co/ingredient'
    data = str(requests.get(url).content)
    indexes = [m.end() for m in re.finditer('href="/ingredient/', data)]
    ingredients = []
    ingredients_pretty = []

    for num in indexes:
        substr = data[num:]
        left_end = substr.find('>')
        right_end = substr.find('<')
        string = substr[left_end+1:right_end]
        ingredients_pretty.append(string)
        ingredients.append(string.lower().replace(' ', '-'))

    with open('tasty_ingredients_pretty.txt', 'w') as file:
        file.write(str(ingredients_pretty))
    with open('tasty_ingredients.txt', 'w') as file:
        file.write(str(ingredients))

    print('Ingredient scraper finished')
    return ingredients


# search_url = 'https://tasty.co/api/recipes/search?size=100&from=0&primary_terms=chocolate&flag=ingredient&in_unit=true'


def get_num_tasty_recipes(url):
    data = str(requests.get(url).content)
    index = data.find('<span class="text-gray-lighter xs-inline-block">')
    substring = data[index:]
    left_end = substring.find('>') + 1
    right_end = substring.find(' ', left_end)
    return substring[left_end:right_end]


def tasty_recipe_scraper(ingredients):
    base_url = 'https://tasty.co/ingredient/'
    data = {}
    for ingredient in ingredients:
        num_recipes = get_num_tasty_recipes(base_url + ingredient)
        recipes = []
        try:
            int(num_recipes)
            for x in range(0, int(num_recipes), 100):
                url = f'https://tasty.co/api/recipes/search?size=100&from={x}&primary_terms={ingredient}&flag=ingredient&in_unit=true'
                recipes += requests.get(url).json()['items']
            data[ingredient] = recipes
        except ValueError:
            print("Couldn't parse", (base_url + ingredient))

    with open('tasty_recipes_raw.txt', 'w') as file:
        file.write(str(data).replace('True', '"True"').replace('False', '"False"').replace('None', '"None"').replace('&amp;', '&'))
    print('Recipe scraper finished')
    recipes_raw_to_json('tasty_recipes_raw.txt')


# POC for node server, for visualization purposes only
def build_tasty_database(filename):
    with open(filename) as json_file:
        data = json.load(json_file)
        database = {}
        recipe_set = set()  
        for ingredient in data:
            database[ingredient] = set()
            for recipe in data[ingredient]:
                recipe_set.add(recipe['name'])
                database[ingredient].add(recipe['name'])
    return database


def main():
    tasty_recipe_scraper(tasty_ingredient_scraper())
    recipes_raw_to_json('tasty_recipes_raw.txt')
    


if __name__ == '__main__':
    main()
    # update_ingredients()
    # tasty_recipe_scraper(tasty_ingredient_scraper())
    # recipes_raw_to_json('tasty_recipes_raw.txt')
    # build_tasty_database('tasty_recipes_json.txt')
