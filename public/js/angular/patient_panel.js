var patient_panel = angular.module('patient_panel',[]);

patient_panel.controller('patientPanelCtrl',['$scope','$http',function($scope,$http){

  /*
  * Doctors access controll
  */

  $scope.patientDoctors = [];
  $scope.restDoctors = [];

  getDoctors();

  $scope.addDoctors = function(fromRestDoctors){
    fromRestDoctors.forEach(function(doctor){
      $http({method: 'POST', url: 'http://localhost:3000/patient/doctors',data: {'doctor_id' : doctor._id}})
        .then(
          function successCallback(response) {
            //przekazywany jest jedynie id, a chcemy dodac caly obiekt do listy patientDoctors
            $scope.patientDoctors.push(doctor);
            $scope.restDoctors.splice($scope.restDoctors.indexOf(doctor),1)
            console.log("add doctors ok");
          },
          function errorCallback(response) {
            console.log('addDoctors fail');
          });
    })
  };

  $scope.removeDoctors = function(fromPatientDoctors){
    fromPatientDoctors.forEach(function(doctor){
      $http({method: 'DELETE', url: 'http://localhost:3000/patient/doctors',headers: {'Content-Type': 'application/json'},data: {'doctor_id' : doctor._id}})
        .then(
          function successCallback(response) {
            //todo usunac z listy patientDoctors dodac do restDoctors
            $scope.restDoctors.push(doctor);
            $scope.patientDoctors.splice($scope.patientDoctors.indexOf(doctor),1);
            console.log("removeDoctors ok");
          },
          function errorCallback(response) {
            console.log('addDoctors fail');
          });
    })
  };

  function getDoctors() {
    $http({method: 'GET', url: 'http://localhost:3000/patient/doctors'})
      .then(
        function successCallback(response) {
          $scope.patientDoctors = response.data.patientDoctors;
          $scope.restDoctors = response.data.restDoctors;
        },

        function errorCallback(response) {
          console.log('getDoctors fail');
      });

  }

  /*
  *  Health story
  */

  $scope.healthStory = getUserHealthStory();

  function getUserHealthStory(){
    //todo pobieranie historii choroby
  }
}]);
