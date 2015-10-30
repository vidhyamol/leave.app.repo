'use strict';
define(['leaveApp', 'empLeaveAppController'], function (leaveApp) {
    leaveApp.register.factory('leaveServices', ['$http', '_', function ($http,_) {
        return { 
            applyEmpLeave : function(empLeaveForm){
                return 
            }
        };
    }]);
});