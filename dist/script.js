/*
 * Copyright 2014 Works Applications Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var dockerhub_registry = "https://hub.docker.com/v2/repositories/biodckr/";
var cross_proxy        = "https://crossorigin.me/";
var quay_registry      = "https://quay.io/api/v1/repository?namespace=biocontainers&popularity=true&last_modified=true";
var quay_registry_repo = "https://quay.io/api/v1/repository/";

var dockerhub_command  = "biodckr/";
var quay_organization       = "biocontainers/";

var app = angular.module('DockerWebUI', ['ngCookies','ngRoute','ngClipboard', 'siTable','ngDonut', 'hljs']);

angular.module('DockerWebUI')
    .factory('timeoutHttpIntercept', function ($rootScope, $q) {
        return {
            'request': function(config) {
                config.timeout = 100000;
                return config;
            }
        }});

app.config(['ngClipProvider', function(ngClipProvider) { ngClipProvider.setPath("includes/bower_components/zeroclipboard/dist/ZeroClipboard.swf"); }]);

app.config(function($httpProvider){
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.config(function (hljsServiceProvider) {
    hljsServiceProvider.setOptions({
        // replace tab with 4 spaces
        tabReplace: '    '
    });
});
app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'pages/home.html',
			controller  : 'MainController'
		})
		.when('/showNamespaces', {
			templateUrl : 'pages/showNamespaces.html',
			controller  : 'NamespacesController'
		})
		.when('/showImages', {
			templateUrl : 'pages/showImages.html',
			controller  : 'ImagesController'
		});
});

app.controller('MainController', ['$scope','$route','$window','$cookies','$location',function($scope,$route,$window,$cookies,$location) {
	var paramIP = dockerhub_registry;
	if(paramIP!=='') {
		console.log('the ip has been changed to ' + paramIP);
		$window.location.href = "#showNamespaces";
		$route.reload();
	}
}]);

app.controller('NamespacesController', function($rootScope,$scope,$http,$route,$cookies,$window,$location) {

	if(dockerhub_registry === undefined) {
		$window.location.href="#";
		$route.reload();
	} else {
		console.log('the ip is ' + dockerhub_registry);
        $scope.IP = dockerhub_registry;
		$scope.num_results=0;
		$scope.dictionary={};
		$scope.namespacesList=[];
		results=[];
		$scope.num_results = 0;
		retrieveDockerHub(cross_proxy + dockerhub_registry, $http, $scope);
		retrieveQuayIO(  quay_registry, $http, $scope);
		console.log($scope.num_results)
	}
});

function retrieveDockerHub( url , $http, $scope){
	$http({method: "GET", url: url}).success(function(data){
		$scope.num_results= $scope.num_results + data.count;
		angular.forEach(data.results, function(result){
		    starred = false
		    if(result.star_count > 0){
		       starred = true
            }
			$scope.dictionary["biodckr/" + result.name] = {domain: "biodckr/", name: result.name, description: result.description, lastModified: result.last_updated, number_pull: [result.pull_count, 15000], start_count:starred}
			$scope.namespacesList.push({domain: "biodckr/", name: result.name, description: result.description, lastModified: result.last_updated, number_pull: [result.pull_count, 15000], start_count:starred})
		});
		if(data.next != null){
			retrieveDockerHub(cross_proxy + data.next, $http, $scope)
		}
	}).error(function(data){console.log("Unable to request the data")});
}

function retrieveQuayIO( url , $http, $scope){
	$http({method: "GET", url: url, headers: {
        'Authorization': "Bearer "+ "XRYLsxvQqmQLpP7RrajpFdiZntveNEyiffXyibK0"}}).success(function(data){
		$scope.num_results= $scope.num_results + data.repositories.length;
		angular.forEach(data.repositories, function(result){
			$scope.dictionary["quay.io/biocontainers/" + result.name] = {domain: "quay.io/biocontainers/", name: result.name, description: result.description, lastModified: (result.last_modified * 1000), number_pull: [result.popularity, 50], start_count:result.is_starred}
			$scope.namespacesList.push({domain: "quay.io/biocontainers/", name: result.name, description: result.description, lastModified: (result.last_modified * 1000), number_pull: [result.popularity, 50], start_count:result.is_starred})
		});
	});
}

app.controller('ImagesController', function($scope,$http,$location,$window,$cookies,$route) {

    $scope.domain=$location.search()['domain'];
    $scope.repository=$location.search()['repository'];
    $scope.repo = {};
    $scope.repo.starred = $location.search()['starred'];
    $scope.repo.last_updated = $location.search()['modified'];

    if($scope.domain == "dockerhub"){
        repoURL    = cross_proxy + dockerhub_registry + $scope.repository;
        imagesURL  = repoURL + "/tags/";
        dockerFile = repoURL + "/dockerfile/";
        $http({method: "GET", url: repoURL}).success(function(data){
            $scope.repo.starred = $location.search()['starred'];
            $scope.repo.repoName     = data.name;
            $scope.repo.description  = data.description;
            $scope.repo.star_count   = data.star_count;
            $scope.repo.pull_count   = data.pull_count;
            $scope.repo.last_updated = data.last_updated;
            $scope.repo.dockerFile   = "";
            $scope.repo.imagesList   = [];
            $scope.repo.domain       = "docker";
            $scope.repo.command      = "docker pull biodckr/" + $scope.repository;
            $scope.repo.url          = "https://hub.docker.com/r/biodckr/" + $scope.repository;
            $http({method: "GET", url: dockerFile}).success(function(data){
                $scope.repo.dockerFile = data.contents;});
            $http({method: "GET", url: imagesURL}).success(function(data){
                angular.forEach(data.results, function(result){
                    $scope.repo.imagesList.push({tag: result.name, last_updated: result.last_updated, size: result.full_size})
                })
            });

        }).error(function(data){console.log("Unable to request the data")})
    }
    if($scope.domain == "quay"){
        repoURL    = quay_registry_repo + quay_organization + $scope.repository;
        $http({method: "GET", url: repoURL, headers: {
            'Authorization': "Bearer "+ "XRYLsxvQqmQLpP7RrajpFdiZntveNEyiffXyibK0"}}).success(function(data){
            $scope.repo.repoName     = $scope.repository;
            $scope.repo.description  = data.description;
            $scope.repo.imagesList   = [];
            $scope.repo.domain       = "quay";
            $scope.repo.url          = "https://quay.io/organization/biocontainers" + $scope.repository;
            $scope.repo.command      = "docker pull quay.io/biocontainers/" + $scope.repository;
            angular.forEach(data.tags, function(key, value){
                    $scope.repo.imagesList.push({tag: key.name, last_updated: key.last_modified, size: key.size})
                })
            });
    }
});


app.filter('filterByName', function() {
    return function(items, field) {
        var result = {};
        angular.forEach(items, function(value, key) {
            if (!value.hasOwnProperty(field)) {
                result[key] = value;
            }
        });
        return result;
    };
});

app.filter('orderObjectBy', function() {
    return function(items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function(item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        if(reverse) filtered.reverse();
        return filtered;
    };
});
