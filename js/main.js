
var app = angular.module('nymph', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "../../partials/about.html", controller: "PageCtrl"})
    .when("/portfolio/:itemId", {templateUrl: "../../partials/portfolio.html", controller: "PortItemCtrl"})
    .otherwise({redirectTo:'/'});

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}]);

app.controller('HomeCtrl', ['$http','$scope',function($http, $scope){
    $http.get('portfolioData.json').then(function(data){
        $scope.items = data.data;
    }); 

}]);


app.directive('itemPortfolio', ['$location', function($location){
  return{
    restrict : 'E',
    scope : {
      item : '='
    },
    templateUrl:'templates/portfolioItem.html',
    link : function(scope, element, attrs){
      element.on('click', function() {
            scope.$apply(function() {
                $location.path('/portfolio/'+scope.item.id);
            });
            console.log(scope.item.id);
      });
    }
  }
}]);


app.controller('PortItemCtrl', ['$scope','$http','$routeParams',function ($scope, $http, $routeParams ) {
  $scope.name = 'PortItemCtrl';
    $http.get('../../portfolioData.json').then(function(data){
        $scope.itemDetail = data.data[$routeParams.itemId];
    });
    $scope.$back = function() { 
      window.history.back();
    };
}]);


app.controller('PageCtrl', function ($scope, $location, $http ) {
  
});