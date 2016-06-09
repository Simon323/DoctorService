var doctor_panel = angular.module('doctor_panel',['ui.bootstrap']);

doctor_panel.controller('doctorPanelCtrl',['$scope','$http', '$uibModal', function($scope,$http, $uibModal){
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

  };

  $scope.remove = function (id) {
    var historyRecordId = id;
    var currentPatientId = $scope.currentPatient._id;

    $http.delete('/patients/'+ currentPatientId + '/history/' + historyRecordId).success(function (res) {
      var url = "http://localhost:3000/patients/"+currentPatientId+"/history";
      $http.get(url).success(function (res) {
        $scope.history = res;
      })
    });
  };

  $scope.edit = function (id) {
    var historyRecordId = id;
    var currentPatientId = $scope.currentPatient._id;

    $http.get('/history/' + historyRecordId).success(function (res) {
      var historyData = res;

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'historyDataEditModal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          historyData: function () {
            return historyData;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        var url = "http://localhost:3000/patients/"+currentPatientId+"/history";
        $http.get(url).success(function (res) {
          $scope.history = res;
        });
      }, function () {
      });
    });
  };
}]);

doctor_panel.controller('ModalInstanceCtrl', function ($scope, $http, $uibModalInstance, historyData) {

  $scope.historyData = historyData;

  $scope.okEditModal = function () {

    $http.put('/history/' + historyData._id, $scope.historyData).success(function (res) {
      $uibModalInstance.close();
    });
  };

  $scope.cancelEditModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
