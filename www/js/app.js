// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todo', ['ionic'])

  // The Projects factory handles saving and loading projects from local storage, and also
  // lets us save and load the last active project index.

.factory('Projects', function(){
  return {
    all: function(){
      var projectString = window.localStorage['projects'];
      if(projectString){
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(projects){
      window.localStorage['projects'] = angular.toJson(projects);
    },
    newProject: function(projectTitle){
      return {
        title: projectTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function(){
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index){
      window.localStorage['lastActiveProject'] = index;
    }
  }
})


.controller('TodoCtrl', function ($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {
  // a utility function for creating a new project with the given projecTitle

  var createProject = function (projectTitle){
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);  
  }

  //load or initialize projects
  $scope.projects = Projects.all();

  //Grab the last active or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  //Called to create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Project Name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };

  //Called to select the given project
  $scope.selectProject = function(project, index){
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };


  //Create our modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal){
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();

  //Inefficient, but save all the projects
  Projects.save($scope.projects);

  task.title = "";  
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function(){
    $scope.taskModal.hide();
  }

  $scope.toggleProjects = function() {
    $scope.taskModal.hide();
  }

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();  
  };

  //try to create the first project, make sure to defer this by using $timeout so everything
  //is initalized properly

  $timeout(function (){
    if($scope.projects.length == 0) {
      while(true){
        var projectTitle = prompt('Your first project title:');
        if(projectTitle){
          createProject(projectTitle);
          break;
        }
      }
    }
  });

});  




// }  $scope.tasks = [];

//   $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
//     $scope.taskModal = modal;
//   }, {
//     scope: $scope,
//     animation: 'slide-in-up'
//   });

  // called when the form is submitted
//   $scope.createTask = function(task){
//     $scope.tasks.push({
//       title: task.title
//     });
//     $scope.taskModal.hide();
//     task.title = "";
//   };

//   //open our new task modal
//   $scope.newTask = function(){
//     $scope.taskModal.show();
//   };

//   //close the new task modal
//   $scope.closeNewTask = function(){
//     $scope.taskModal.hide();
//   };
// }); 

// .run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
//     if(window.cordova && window.cordova.plugins.Keyboard) {
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//     }
//     if(window.StatusBar) {
//       StatusBar.styleDefault();
//     }
//   });
// })
