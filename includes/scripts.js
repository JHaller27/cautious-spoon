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
    $scope.names = [
        {first: 'James', last: 'Haller'},
        {first: 'Jessica', last: 'Ketchum'},
        {first: 'Brian', last: 'Hanby'},
        {first: 'Jon', last: 'Snow'},
        {first: 'Arya', last: 'Nobody'},
        {first: 'Rob', last: 'Stark'}
    ];

    $scope.recipes = [
        new Recipe("Milk in a cup", "", ["Easy", "Vegetarian"], ["Milk"], [], ["Pour milk into cup"], "Cold milk is best!"),
        new Recipe("Chicken Nuggets", "The cheap and dirty way", ["Chicken", "Easy"], ["Tyson's Fun Nuggets"], [], ["Place 5 chicken nuggets on a plate", "Cook for 1:30", "(Optional) serve with Kraft Chipotle Aioli sauce", "Enjoy!"], ""),
        new Recipe("Buffalo Chicken Mac & Cheese", "From the kitchen of Jessica Ketchum", ["Chicken", "Pasta"], ["Annie's Cheddar Mac & Cheese", "Tyson Buffalo Chicken Tenders"], ["Preheat oven to 400F"], ["Bake chicken tenders for 15-20 minutes", "Follow directions on Mac & Cheese box", "Slice chicken", "Stir chicken into mac & cheese"], "Best served warm!")
    ];
});

app.filter('lnameFilter', function () {
    return function (people, scope) {
        let result = [];
        people.forEach(person => {
            if (scope.name === undefined || scope.name === '' || person.last.toLowerCase().indexOf(scope.name.toLowerCase()) >= 0) {
                result.push(person);
            }
        });
        return result;
    };
});
