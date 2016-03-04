﻿angularApp.service('UtilService', [ '$state','$rootScope', 'LoginVaildationService', '$filter', 'JSONService', function ($state,$rootScope, userSession, $filter, jsonService) {
    this.GetDateList = function () {
        var myObjects = [];
        var today = new Date(), tempdate = null, temp_date, temp_month, temp_year, calculated_date;
        for (var i = 7; i >= 0; i--) {
            tempdate = new Date(today);
            tempdate.setDate(today.getDate() - i);
            temp_date = tempdate.getDate();
            temp_month = tempdate.getMonth() + 1;
            temp_year = tempdate.getFullYear();
            calculated_date = Date.parse(temp_month + "/" + temp_date + "/" + temp_year);
            myObjects.push(calculated_date);
        }

        return myObjects;
    }

    this.GetMinuteList = function () {
        return ([
            { value: 0, label: "00" },
            { value: 15, label: "15" },
            { value: 30, label: "30" },
            { value: 45, label: "45" }
        ])
    }

    this.GetHourList = function () {
        var myObjects = [];
        for (var i = 0; i <= 24; i++) {
            myObjects.push(i);
        }
        return myObjects;
    }


    this.GetYearList = function () {

        var yearsList = [];
        for (var i = new Date().getFullYear() ; i >= 2008; i--) {
            yearsList.push(i)
        }
        return yearsList;

    };

    this.AvoidUnAuthorisedAccess= function()
    {
        var userDetails = userSession.getStatus();
        if (userDetails.isLogged) {
            $rootScope.userName = userDetails.userName;
            $rootScope.showUser = { 'visibility': 'visible' };
            $rootScope.sidebar = true;
            return true;
        }
        else
        {
            $state.go('login');
            return false;
        }
       
    }
}]);