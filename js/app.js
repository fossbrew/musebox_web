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
            data: 'deadmau5'
        };

        $scope.tracks = {
            data : ''
        };

        $scope.download = {
            url : ''
        };

        $scope.listen = {
            url : ''
        };

        $scope.trackData = {
            data : ''
        };

        $scope.greeting = {
            text: 'Hello'
        };

        $scope.$watch('query.data', function() {
            fetch();
        });

        function fetch() {
            $http.post("https://dabbrapi.herokuapp.com/api/search", {'query' : $scope.query.data})
                .then(function(response) {
                    $scope.tracks.data = response.data;
                    // console.log(response.data);
                });
        };

        $scope.getTrack = function(track_id) {
            $http.get("https://dabbrapi.herokuapp.com/api/info/"+ track_id)
                .then(function(response) {
                    $scope.trackData.data = response.data;
                    // console.log(response);
                });
        };

        $scope.downloadTrack = function(track_id) {
            $http.get("https://dabbrapi.herokuapp.com/api/download/"+ track_id)
                .then(function(response) {
                    $scope.download.url = response.data;
                    // console.log(response);
                    window.open(response.data, "_self");
                });
        };

        $scope.playTrack = function(track_id) {
            $http.get("https://dabbrapi.herokuapp.com/api/download/"+ track_id)
                .then(function(response) {
                    $scope.listen.url = response.data;
                    console.log($scope.listen.url);
                });

            $http.get("https://dabbrapi.herokuapp.com/api/info/"+ track_id)
                .then(function(response) {
                    $scope.trackData.data = response.data;
                    console.log($scope.trackData.data);
                });
        };
    }
]);
