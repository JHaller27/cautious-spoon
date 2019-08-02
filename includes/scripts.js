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
    }
}

app.controller('recipeCtrl', function ($scope) {
    $scope.themes = ['water', 'earth', 'fire', 'air', 'magic', 'light', 'dark'];
    $scope.recipes = [
        new Recipe("Milk in a cup", "", ["Easy", "Vegetarian"], ["Milk"], [], ["Pour milk into cup"], "Cold milk is best!"),
        new Recipe("Chicken Nuggets", "The cheap and dirty way", ["Chicken", "Easy"], ["Tyson's Fun Nuggets"], [], ["Place 5 chicken nuggets on a plate", "Cook for 1:30", "(Optional) serve with Kraft Chipotle Aioli sauce", "Enjoy!"], ""),
        new Recipe("Buffalo Chicken Mac & Cheese", "From the kitchen of Jessica Ketchum", ["Chicken", "Pasta"], ["Annie's Cheddar Mac & Cheese", "Tyson Buffalo Chicken Tenders"], ["Preheat oven to 400F"], ["Bake chicken tenders for 15-20 minutes", "Follow directions on Mac & Cheese box", "Slice chicken", "Stir chicken into mac & cheese"], "Best served warm!")
    ];

    $scope.storeTheme = function (newTheme) {
        localStorage.setItem(STORED_THEME, newTheme);
    }

    function init() {
        $scope.currentTheme = $scope.themes[0];

        // localStorage stuff
        var storedTheme = localStorage.getItem(STORED_THEME);
        if (storedTheme === undefined) {
            storeTheme($scope.currentTheme);
        }
        else {
            $scope.currentTheme = storedTheme;
        }
    }

    init();
});
