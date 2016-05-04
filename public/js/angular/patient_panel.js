var patient_panel = angular.module('patient_panel',[]);

patient_panel.controller('patientPanelCtrl',['$scope',function($scope){
  
  /*
  * Doctors access controll 
  */
  
  $scope.allDoctors  = getAllDoctors();
  $scope.userDoctors = getUserDoctors();
  $scope.restDoctors = getRestDoctors($scope.allDoctors, $scope.userDoctors);

  $scope.addDoctors = function(doctors){
    //todo request
    //todo dodawanie do list userDoctors i restDoctors
  };
  
  $scope.removeDoctors = function(doctors){
    //todo request
    //todo usuwanie z list userDoctors i restDoctors
  };
  function getAllDoctors() {
    //todo http get /doctors
  }

  function getUserDoctors() {
    //todo http get /patient/:id/doctors
  }

  function getRestDoctors(allDoctors,userDoctors) {
    //todo roznica
  }
  
  /*
  *  Health story
  */
  
  $scope.healthStory = getUserHealthStory();
  
  function getUserHealthStory(){
    //todo pobieranie historii choroby  
  }
}]);
