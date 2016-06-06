var doctor_panel = angular.module('doctor_panel',[]);

doctor_panel.controller('doctorPanelCtrl',['$scope','$http',function($scope,$http){
  $scope.patients = [];
  $scope.history = [];
  $scope.currentPatient = {};
  getPatients();

  $scope.getHistory = function(patient){
    var patient_id = patient._id;
    var url = "http://localhost:3000/patients/"+patient_id+"/history";
    $http({method: 'GET', url: url})
      .then(
        function successCallback(response) {
          $scope.history = response.data;
          $scope.currentPatient = patient;
          console.log("getHistory ok")
        },

        function errorCallback(response) {
          console.log('getHistory fail');
        });
  };
  function getPatients() {
    $http({method: 'GET', url: 'http://localhost:3000/doctors/patients'})
      .then(
        function successCallback(response) {
          $scope.patients = response.data;
          console.log("getPatients ok")
        },

        function errorCallback(response) {
          console.log('getPatients fail');
        });
  }
  
  $scope.addHistoryRecord = function () {
    
  }
}]);
