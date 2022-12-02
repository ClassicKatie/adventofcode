#!/bin/python3

def most_calories(calorie_counts):
    # The input file will be a series of lines where each line will have an integer representing
    # the number of calories in an item of food. Each grouping of lines represents the food belonging
    # to a single elft. 'grouping of lines' means that the transition between elves is marked
    # by a blank line

    # we need to determine who has the most calories and how many total calories that elf is carrying
    top_elves = [0, 0, 0]
    current_calories = 0
    for item in calorie_counts:
        item.strip()
        if item.isspace():
            # we have finished with our most recent elf
            # now we need to determine if this person is in the top 3
            # start at bottom because then we can nope out faster

            # push this on to the array of top elves, sort, then drop the bottom
            top_elves.append(current_calories)
            top_elves.sort(reverse=True)
            top_elves.pop()

            # reset calories for the next elf
            current_calories = 0
        else:
            current_calories += int(item.strip())
    return top_elves

if __name__ == '__main__':
    with open('calories.txt') as f:
        calorie_counts = f.readlines()
    print(sum(most_calories(calorie_counts)))
