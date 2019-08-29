const STORED_THEME = 'recipesTheme';

var app = angular.module('recipeApp', []);

class Recipe {
    constructor(name, description, tags, ingredients, prep, steps, notes) {
        this.Name = name;
        this.Description = description;
        this.Tags = tags;
        this.Ingredients = ingredients;
        this.Prep = prep;
        this.Steps = steps;
        this.Notes = notes;
        this.Show = false;
    }
}

const STATIC_RECIPES = [
    new Recipe("Milk in a cup", "", ["Difficulty:Easy", "Meat:None"], ["Milk"], [], ["Pour milk into cup"], "Cold milk is best!"),
    new Recipe("Chicken Nuggets", "The cheap and dirty way", ["Meat:Chicken", "Difficulty:Easy"], ["Tyson's Fun Nuggets"], [], ["Place 5 chicken nuggets on a plate", "Cook for 1:30", "(Optional) serve with Kraft Chipotle Aioli sauce", "Enjoy!"], ""),
    new Recipe("Buffalo Chicken Mac & Cheese", "From the kitchen of Jessica Ketchum", ["Meat:Chicken", "Pasta"], ["Annie's Cheddar Mac & Cheese", "Tyson Buffalo Chicken Tenders"], ["Preheat oven to 400F"], ["Bake chicken tenders for 15-20 minutes", "Follow directions on Mac & Cheese box", "Slice chicken", "Stir chicken into mac & cheese"], "Best served warm!"),
    new Recipe("Cheese Burgers", "Classic American", ["Meat:Beef", "Grill"], ["Burger buns", "Ground beef (patties)", "Condiments"], ["Light the grill OR Pre-heat stove"], ["Place patties on grill/stove", "Wait until browned", "Flip", "Wait until browned on both sides", "Place sliced cheese on patties", "Cook for no longer than 1 more minute"], "Easiest on grill")
];

function strContains(superstring, substring, caseSensitive = false) {
    if (substring === '') {
        return true;
    }
    if (superstring === '') {
        return false;
    }

    if (caseSensitive) {
        return superstring.indexOf(substring) >= 0;
    }
    else {
        return superstring.toLowerCase().indexOf(substring.toLowerCase()) >= 0;
    }
}

function retreiveRecipes () {
    return STATIC_RECIPES;
}

app.controller('recipeCtrl', function ($scope) {
    $scope.themes = ['light', 'dark', 'water', 'earth', 'fire', 'air', 'magic'];
    $scope._recipes = null;

    $scope.storeTheme = function (newTheme) {
        localStorage.setItem(STORED_THEME, newTheme);
    }

    $scope.getRecipes = function() {
        if ($scope._recipes === null) {
            $scope._recipes = retreiveRecipes();
        }

        return $scope._recipes;
    }

    $scope._cachedTags = null;
    $scope.getTags = function () {
        if ($scope._cachedTags === null) {
            // Generate new tags
            $scope._cachedTags = {
                Categories: ['Custom'],
                Custom: []
            };

            $scope.getRecipes().forEach(recipe => {
                recipe.Tags.forEach(tag => {
                    let categorySplit = tag.indexOf(':');
                    if (categorySplit < 0) {
                        $scope._cachedTags.Custom.push(tag);
                    }
                    else if (categorySplit === 0) {
                        $scope._cachedTags.Custom.push(tag.substr(categorySplit, tag.indexOf(':')));
                    }
                    else {
                        let category = tag.substr(0, tag.indexOf(':'));
                        let tagName = tag.substr(tag.indexOf(':') + 1);
                        if ($scope._cachedTags[category] === undefined) {
                            $scope._cachedTags[category] = [tagName];
                            $scope._cachedTags.Categories.push(category);
                        }
                        else if (!$scope._cachedTags[category].includes(tagName)) {
                            $scope._cachedTags[category].push(tagName);
                        }
                    }
                });
            });
        }

        return $scope._cachedTags;
    }

    function init() {
        // localStorage stuff
        var storedTheme = localStorage.getItem(STORED_THEME);
        if (storedTheme === null) {
            $scope.currentTheme = $scope.themes[0];
            $scope.storeTheme($scope.currentTheme);
        }
        else {
            $scope.currentTheme = storedTheme;
        }

        // other default values
        $scope.showControls = false;
    }

    init();
});

// Determine if an individual recipe should be displayed
// :param recipe: A Recipe object
// :param filters: An object whose elements are filter data
// :return: true if this Recipe should be displayed, false otherwise
function displayRecipe(recipe, filters) {
    if (strContains(recipe.Name, filters.Name)) {
        return true;
    }

    return false;
}

app.filter('recipeFilters', function () {
    return function (allRecipes, filters) {
        if (filters === undefined) {
            return allRecipes;
        }
        else {
            var result = [];
            allRecipes.forEach(recipe => {
                if (displayRecipe(recipe, filters)) {
                    result.push(recipe);
                }
            });
            return result;
        }
    }
});
