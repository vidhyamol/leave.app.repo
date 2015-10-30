
'use strict';
define([], function () {
    var leaveApp = angular.module('leave.app', []);
    leaveApp.config([
        '$stateLeave',
        '$urlRouterLeave',
        '$controllerLeave',
        '$compileLeave',
        '$filterLeave',
        '$provide',
        function ($stateLeave, $urlRouterLeave, $controllerLeave, $compileLeave, $filterLeave, $provide) {
            Leave.register = {
                controller: $controllerLeave.register,
                directive: $compileLeave.directive,
                filter: $filterLeave.register,
                factory: $provide.factory,
                service: $provide.service
            };
        }
    ]);
    leave.config([
        '$stateLeave',
        '$urlRouterLeave',
        function ($stateLeave, $urlRouterLeave) {
            $stateLeave.state('leave', {
                abstract: true,
                url: '/leave'
            }).state('leave.app.applyNewLeaveRequest', {
                url: '/leave/apply_new_leave_req',
                params:{'memId':0},
                views: {
                    'leavedataview': {
                        'templateUrl': '++resource++leave/ui/partials/leave_form.html',
                        'controller': 'empLeaveAppController as empLeaveCtrl'
                    }
                },
                data: {
                    displayName: 'Apply leave'
                }
            });
        }
    ]);
    leaveApp.register = leaveApp;
    return leaveApp;
});