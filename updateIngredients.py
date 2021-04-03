import json
import requests


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
    with open('ingredients.txt', 'w') as file:
        file.write(str(food))
    print('Done!')


def read_file_to_set(filename):
    with open(filename, 'r') as file:
        data = set(file.read()[1:-1].replace("'", "").split(', '))
        return data


def main():
    data = read_file_to_set('ingredients.txt')
    print(data)


if __name__ == '__main__':
    # main()
    update_ingredients()
