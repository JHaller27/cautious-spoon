var app = angular.module('recipeApp', []);

app.controller('recipeCtrl', function ($scope) {
    $scope.names = [
        {first: 'James', last: 'Haller'},
        {first: 'Jessica', last: 'Ketchum'},
        {first: 'Brian', last: 'Hanby'},
        {first: 'Jon', last: 'Snow'},
        {first: 'Arya', last: 'Nobody'},
        {first: 'Rob', last: 'Stark'}
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
