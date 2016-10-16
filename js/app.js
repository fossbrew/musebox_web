var app = angular.module('grabist', []);

app.controller('searchController', ['$scope', '$http',
    function($scope, $http) {
        $scope.query = {
            data: 'The Weeknd'
        };

        $scope.tracks = {
            data : ''
        };

        $scope.download = {
            url : ''
        };

        $scope.trackData = {
            data : ''
        };

        console.log($scope.query);

        $scope.greeting = {
            text: 'Hello'
        };

        $scope.$watch('query.data', function() {
            fetch();
        });

        function fetch() {
            $http.post("https://grabist-api.herokuapp.com/api/search", {'query' : $scope.query.data})
                .then(function(response) {
                    $scope.tracks.data = response.data;
                    console.log(response.data);
                });
        };

        $scope.getTrack = function(track_id) {
            $http.get("https://grabist-api.herokuapp.com/api/info/"+ track_id)
                .then(function(response) {
                    $scope.trackData.data = response.data;
                    console.log(response);
                });
        };

        $scope.downloadTrack = function(track_id) {
            $http.get("https://grabist-api.herokuapp.com/api/download/"+ track_id)
                .then(function(response) {
                    $scope.download.url = response.data;
                    console.log(response);
                    window.open(response.data, "_self");
                });
        };
    }
]);
