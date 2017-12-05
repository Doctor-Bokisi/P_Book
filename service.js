/// <reference path="c:\users\user\documents\visual studio 2015\Projects\P_Book\P_Book\Scripts/angular.js" />

var UserService = angular.module('UserService', []);

UserService.factory('UserApi', function ($http) {
    var urlBase = "http://localhost:7590/api/";
    var UserApi = {};

    //Get all Contacts

    UserApi.getContacts = function () {

        return $http.get(urlBase + '/Contacts');
    }

    //Add Contacts to PhoneBook
    UserApi.AddContacts = function (contact) {
        return $http.post(urlBase + '/Contacts/', contact);
    }

    //Update Contacts 
    UserApi.EditContacts = function (contactToEdit) {
        var datta = $http({
            method: 'PUT',
            url: urlBase + 'Contacts/' + contactToEdit.contact_Id,
            data: contactToEdit,

        });
        return datta;
    }

    //Delete Contacts from the BhoneBok
    
    UserApi.DeleteContactz = function (contactToDelete) {
        var data = $http({
            method: 'DELETE',
            url: urlBase + 'Contacts/' + contactToDelete.contact_Id,
            data: contactToDelete,

        });
        return data;
    }

    return UserApi;
});