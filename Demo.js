/// <reference path="c:\users\user\documents\visual studio 2015\Projects\P_Book\P_Book\Scripts/angular.js" />

var SignIn = angular.module("SignIn", ['ngRoute', 'UserService']);

SignIn.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'HTML_Views/Home.html'

        }).when('/Edit', {

            templateUrl: 'HTML_Views/Edit.html',
            controller: 'EditController'
        }).
    when('/Add', {

        templateUrl: 'HTML_Views/Add.html',
        controller: 'AddController'
    }).
     when('/Home', {

         templateUrl: 'HTML_Views/Home.html',
         controller: 'HomeController'
     })
    .when('/Delete', {

        templateUrl: 'HTML_Views/Delete.html',
        controller: 'DeleteController'

    }).
    otherwise({
        redirectTo: "/Home"
    });

}]);

SignIn.controller("AddController", function ($scope, $location, UserApi) {
    $scope.AdContact = function () {
        var ContactToAdd = {
            'Name': $scope.Name,
            'Phone_Num': $scope.Phone_Num,
            'Email': $scope.Email,
            'Address': $scope.Address,
            'City': $scope.City
        };
    
        UserApi.AddContacts(ContactToAdd).then(function (reponse) {
            alert("Contact added successfully");
            $scope.Name = undefined;
            $scope.Phone_Num = undefined;
            $scope.Email = undefined;
            $scope.Address = undefined;
            $scope.City = undefined;
            $location.path('/Home');
        }),
            function (response) {
                alert("Unable to add user");
            };

    };

});

//Controller for updating Profile
SignIn.controller("EditController", function ($scope, UserApi, $location, $rootScope) {



    $scope.selectedItem = "Select Id";
    $scope.isDeletedItemVisible = false;
    getContactss();
    function getContactss() {
        UserApi.getContacts().then(function (response) {
            $scope.conts = response.data;
        }), function () {
            alert("Couldn't get all the users information");
        }
    };

    $scope.dropboxitemselected = function (item) {
        $scope.isDeletedItemVisible = true;
        $scope.selectedItem = item.contact_Id;
        $scope.Name = item.Name;
        $scope.Phone_Num = item.Phone_Num;
        $scope.Email = item.Email;
        $scope.Address = item.Address;
        $scope.City = item.City;
        $scope.contact_Id = item.contact_Id;

    };

    $scope.EditContact = function () {
        var ContactToEdit = {
            'contact_Id': $scope.contact_Id,
            'Name': $scope.Name,
            'Phone_Num': $scope.Phone_Num,
            'Email': $scope.Email,
            'Address': $scope.Address,
            'City': $scope.City
        };

        UserApi.EditContacts(ContactToEdit).then(function (reponse) {
            alert("Contact profile updated successfully");
            $scope.contact_Id = undefined;
            $scope.Name = undefined;
            $scope.Phone_Num = undefined;
            $scope.Email = undefined;
            $scope.Address = undefined;
            $scope.City = undefined;
            $scope.selectedItem = "selected Contact";
            $scope.isDeletedItemVisible = false;
            getContactss();
            $location.path('/Home');
        }),
           function (response) {
               alert("Unable to edit user profile");
           }
    }
});

SignIn.controller("HomeController", function ($scope, $location, UserApi) {

    getContactss();
    function getContactss() {
        UserApi.getContacts().then(function (response) {
            $scope.cont = response.data;
        }), function () {
            alert("Couldn't get all the users information");
        }
    }

});

SignIn.controller("DeleteController", function ($scope, $location, UserApi) {
 
    $scope.selectedItem = "Select Contact";
    $scope.isDeletedItemVisible = false;
    getContactss();
    function getContactss() {
        UserApi.getContacts().then(function (response) {
            $scope.conts = response.data;
        }), function () {
            alert("Couldn't get all the users information");
        }
    };

    $scope.dropboxitemselected = function (item) {
        $scope.isDeletedItemVisible = true;
        $scope.selectedItem = item.contact_Id;
        $scope.Name = item.Name;
        $scope.Phone_Num = item.Phone_Num;
        $scope.Email = item.Email;
        $scope.Address = item.Address;
        $scope.City = item.City;
        $scope.contact_Id = item.contact_Id;

    };

    $scope.DeleteContact = function () {
        var ContactToDelete = {
            'contact_Id': $scope.contact_Id,
        };

        UserApi.DeleteContactz(ContactToDelete).then(function (reponse) {
            alert("Contact profile updated successfully");
            $scope.contact_Id = undefined;
            $scope.Name = undefined;
            $scope.Phone_Num = undefined;
            $scope.Email = undefined;
            $scope.Address = undefined;
            $scope.City = undefined;
            $scope.selectedItem = "selected Contact";
            $scope.isDeletedItemVisible = false;
            getContactss();
            $location.path('/Home');
        }),
           function (response) {
               alert("Unable to edit user profile");
           }
    }

});