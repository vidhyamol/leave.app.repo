
'use strict';
define([], function () {
    var leave = angular.module('leave.app', []);
    leave.config([
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
            }).state('leave.leavebase.applyNewLeaveRequest', {
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
            }).state('leave.leavebase.applyNewLeaveRequest', {
                url: '/leave/apply_new_leave_req/:emp_idn',
                params:{'emp_idn':0},
                views: {
                    'leavedataview': {
                        'templateUrl': '++resource++lv/src/leave/partials/leave_form.html',
                        'controller': 'empLeaveAppController as empLeaveCtrl',
                        resolve: route.resolve(['empLeaveAppController'])
                    }
                },
                data: {
                    displayName: 'Apply leave'
                }
            }).state('leave.leavebase.loginEmp', {
                url: '/leave/login_emp/:emp_idn',
                params:{'emp_idn':0},
                views: {
                    'leavedataview': {
                        'templateUrl': '++resource++lv/src/leave/partials/login_form.html',
                        'controller': 'empLoginController as empLoginCtrl',
                        resolve: route.resolve(['empLoginController'])
                    }
                },
                data: {
                    displayName: 'login form'
                }
            }).state('leave.leavebase.getDemographicPage', {
                url: '/leave/emp_demo_page/:emp_idn',
                params:{'emp_idn':0},
                views: {
                    'leavedataview': {
                        'templateUrl': '++resource++lv/src/leave/partials/empDemographic.html',
                        'controller': 'empDemographicController as empDemographicCtrl',
                        resolve: route.resolve(['empDemographicController'])
                    }
                },
                data: {
                    displayName: 'emp demo page'
                }
            }).state('leave.leavebase.empTabPage', {
                url: '/leave/emp_tab_page/:emp_idn',
                params:{'emp_idn':0},
                views: {
                    'leavedataview': {
                        'templateUrl': '++resource++lv/src/leave/partials/empTabs.html',
                        'controller': 'empTabController as empTabCtrl',
                        resolve: route.resolve(['empTabController'])
                    }
                },
                data: {
                    displayName: 'emp tab page'
                }
            });
        }
    ]);
    leave.register = leave;
    return leave;
});