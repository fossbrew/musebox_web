var app = angular.module('dabbr', []);

app.config(["$sceDelegateProvider", function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        "http://*.pleerstorage.com/**"
    ]);
}]);

app.controller('searchController', ['$scope', '$http',
    function($scope, $http) {

        $scope.query = {
            data: ''
        };

        $scope.tracks = {
            data: ''
        };

        $scope.download = {
            url: ''
        };

        $scope.listen = {
            url: ''
        };

        $scope.trackData = {
            data: ''
        };

        $scope.greeting = {
            text: 'Hello'
        };

        $scope.$watch('query.data', function() {
            fetch();
        });

        var apiUrl = "http://35.167.11.70:9000/api";

        function fetch() {
            $http.post(apiUrl + "/search", {
                    'query': $scope.query.data
                })
                .then(function(response) {
                    // if (!Object.keys(response).length === 0) {
                        $scope.tracks.data = response.data;
                    // }
                });
        };

        $scope.random = function() {
            $http.get(apiUrl + "/billboard")
                .then(function(response) {
                    $scope.query.data = response.data[Math.floor(Math.random() * response.data.length)];
                });
        };

        $scope.getTrack = function(track_id) {
            $http.get(apiUrl + "/info/" + track_id)
                .then(function(response) {
                    $scope.trackData.data = response.data;
                    // console.log(response);
                });
        };

        $scope.downloadTrack = function(track_id) {
            $http.get(apiUrl + "/download/" + track_id)
                .then(function(response) {
                    $scope.download.url = response.data;
                    // console.log(response);
                    window.open(response.data, "_self");
                });
        };

        $scope.playTrack = function(track_id) {
            $http.get(apiUrl + "/download/" + track_id)
                .then(function(response) {
                    $scope.listen.url = response.data;
                    console.log($scope.listen.url);
                });

            $http.get(apiUrl + "/info/" + track_id)
                .then(function(response) {
                    $scope.trackData.data = response.data;
                    console.log($scope.trackData.data);
                });
        };
    }
]);
