import re
import requests
import json


def has_numbers(string):
    return any(char.isdigit() for char in string)


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

    print('Done!')
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
    data = []
    for ingredient in ingredients:
        num_recipes = get_num_tasty_recipes(base_url + ingredient)
        try:
            int(num_recipes)
            for x in range(0, int(num_recipes), 100):
                url = f'https://tasty.co/api/recipes/search?size=100&from={x}&primary_terms={ingredient}&flag=ingredient&in_unit=true'
                data.append(requests.get(url).json())
        except ValueError:
            print("Couldn't parse", (base_url + ingredient))
        print("Parsed:", ingredient)

    with open('tasty_recipes_raw.txt', 'w') as file:
        file.write(str(data))


def main():
    data = read_file_to_set('ingredients_list.txt')
    print(data)


if __name__ == '__main__':
    # main()
    # update_ingredients()
    tasty_recipe_scraper(tasty_ingredient_scraper())

