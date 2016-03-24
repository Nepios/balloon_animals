angular.module('BalloonCtrls', ['BalloonServices'])
.controller('HomeCtrl', ['$scope', 'Balloon', function($scope, Balloon) {
  $scope.balloons = [];

  Balloon.query(function success(data) {
    $scope.balloons = data;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('ShowCtrl', ['$scope', '$stateParams', 'Balloon', function($scope, $stateParams, Balloon) {
  $scope.balloons = {};

  Balloon.get({id: $stateParams.id}, function success(data) {
    $scope.balloons = data;
  }, function error(data) {
    console.log(data);
  });
}])

.controller('NavCtrl', ['$scope', 'Auth', '$state', function($scope, Auth, $state) {
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    $state.reload();
    console.log('My token:', Auth.getToken());
  }
}])
    
.controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success(res) {
      $location.path('/');
    }, function error(res) {
      console.log(res);
    });
  }
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth',function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
   $http.post('/api/auth', $scope.user).then(function success(res) {
    Auth.saveToken(res.data.token);
    $location.path('/')
   }, function error(res) {
    console.log(res);
   })
  }
}]);