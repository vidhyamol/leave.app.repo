'use strict';
define(['leave', 'empLoginController'], function (leave) {
    leave.register.factory('leaveServices', ['$http', '_', function ($http,_) {
        var context = {};
         return {
            getData: function () {
                return context;
            },
            setData: function (data) {
                 context = data;
            },
             getLeaveBal: function(empLeaveForm) {
                return $http.post("Leave/Controller/getLeaveBal",empLeaveForm);
            },
            getEmpDemograpgicPage: function(stateParams){
                return {
                    templateUrl: '++resource++prv/src/leave/empDemographic.html',
                    controller: 'empDemographicController',
                    controllerAs: 'empDemographicCtrl',
                    size: 'lg',
                    resolve: {
                            $stateParams: function() {
                                return stateParams;
                            }
                    }
                };
            },
            
            empLoginValidation : function(empLoginForm){
                return $http.post("Leave/Controller/empLoginCheck",empLoginForm);
            },
            applyEmpLeave : function(empLeaveForm){
                return $http.post("Leave/Controller/empLeaveDetails",empLeaveForm);
            }
        };
    }]);
});