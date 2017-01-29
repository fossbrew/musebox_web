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
            $http.post("http://ec2-35-167-11-70.us-west-2.compute.amazonaws.com:9000/api/search", {'query' : $scope.query.data})
                .then(function(response) {
                    $scope.tracks.data = response.data;
                    // console.log(response.data);
                });
        };

        $scope.getTrack = function(track_id) {
            $http.get("http://ec2-35-167-11-70.us-west-2.compute.amazonaws.com:9000/api/info/"+ track_id)
                .then(function(response) {
                    $scope.trackData.data = response.data;
                    // console.log(response);
                });
        };

        $scope.downloadTrack = function(track_id) {
            $http.get("http://ec2-35-167-11-70.us-west-2.compute.amazonaws.com:9000/api/download/"+ track_id)
                .then(function(response) {
                    $scope.download.url = response.data;
                    // console.log(response);
                    window.open(response.data, "_self");
                });
        };

        $scope.playTrack = function(track_id) {
            $http.get("http://ec2-35-167-11-70.us-west-2.compute.amazonaws.com:9000/api/download/"+ track_id)
                .then(function(response) {
                    $scope.listen.url = response.data;
                    console.log($scope.listen.url);
                });

            $http.get("http://ec2-35-167-11-70.us-west-2.compute.amazonaws.com:9000/api/info/"+ track_id)
                .then(function(response) {
                    $scope.trackData.data = response.data;
                    console.log($scope.trackData.data);
                });
        };
    }
]);
