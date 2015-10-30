'use strict';
define(['leaveApp', 'leaveServices', 'convertUSNumberFormat', 'breadcrumbsDirectives'],
    function (leaveApp) {
        leaveApp.register.controller('empLeaveAppController',
            ['$scope', 'leaveServices','limitToFilter','$state','_','regexService', '$stateParams', '$window', 'jDateService',
			 'memlstService', '$filter', 'jTitleService',
            
            function($scope, leaveServices, limitToFilter, $state, _, regexService, $stateParams, $window, jDateService,
			         memlstService, $filter, jTitleService){
            
            var empLeaveCtrl = this;
            empLeaveCtrl.regexService = regexService;
            empLeaveCtrl.empLeaveForm = {speciality: []};
            empLeaveCtrl.speciality = [];
            empLeaveCtrl.dateFilter = $filter('date');

            empLeaveCtrl.datePickerformat = jDateService.getDateFormat();
            empLeaveCtrl.allCals = {};
            empLeaveCtrl.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
            empLeaveCtrl.toggleCal = function ($event, calarg) {
                $event.preventDefault();
                $event.stopPropagation();
                empLeaveCtrl.allCals[calarg] = true;
            };

            empLeaveCtrl.cancelLeaveApplication = function(){
                memlstService.transitionToPreviousState('false');
            };

            empLeaveCtrl.applyNewLeaveRequest = function(){
                if (!empLeaveCtrl.empLeaveForm.leave_type)
                    $window.alert("Please select Leave Type.");
                else if (!empLeaveCtrl.empLeaveForm.from_dt || !empLeaveCtrl.empLeaveForm.to_dt)
                    $window.alert("Please specify valid date range.");
		else if (empLeaveCtrl.empLeaveForm.from_dt >empLeaveCtrl.empLeaveForm.to_dt)
                    $window.alert("From Date is greater than ToDate.");
		else if (empLeaveCtrl.empLeaveForm.days >empLeaveCtrl.empLeaveForm.leave_bal)
                    $window.alert("You don't have enough leave balance to avail the Earned Leave.");
		else if (!empLeaveCtrl.empLeaveForm.reason )
                    $window.alert("Please enter the reason for leave.");
		else if (!empLeaveCtrl.empLeaveForm.contact_details )
                    $window.alert("Please enter contact details.");
		    
                else {
                    empLeaveCtrl.empLeaveForm.from_dt = empLeaveCtrl.dateFilter(empLeaveCtrl.empLeaveForm.from_dt, empLeaveCtrl.datePickerformat);
                    empLeaveCtrl.empLeaveForm.to_dt = empLeaveCtrl.dateFilter(empLeaveCtrl.empLeaveForm.to_dt, empLeaveCtrl.datePickerformat);
                   
                    _applyLeave(empLeaveCtrl.empLeaveForm);
                }
            };

            var _applyLeave = function(postConfig){
          
		leaveServices.applyEmpLeave(postConfig)
		    .then(function (response) {
			memlstService.transitionToPreviousState('true');
			$scope.$emit('event:jivaMessages', {'messageCode': response.data.msgCode});
		});
	
            };

            empLeaveCtrl.calculateLeaveCount = function(obj, from_dt){
		var to_dt= obj.empLeaveCtrl.empLeaveForm.to_date;
		if (!from_dt || !to_dt)
                    $window.alert("Please specify valid date range.");
		else if (from_dt >to_dt)
                    $window.alert("From Date is greater than ToDate.");
		else{
		    var one_day,date1_ms,date2_ms,difference_ms,session1_val,session2_val;
		    session1_val = obj.empLeaveCtrl.empLeaveForm.session1_type;
		    session2_val = obj.empLeaveCtrl.empLeaveForm.session2_type;
		    one_day=1000*60*60*24;//Get 1 day in milliseconds
		    date1_ms = from_dt.getTime();// Convert both dates to milliseconds 
		    date2_ms = to_dt.getTime();
		    difference_ms = Math.round((date2_ms - date1_ms)/one_day);// Calculate the difference in milliseconds and Convert back to days
		    difference_ms = difference_ms+1;
		    if ((session1_val == "half_day")&&(session2_val == "half_day")){
			if (difference_ms == 1){
			empLeaveCtrl.empLeaveForm.days = 0.5;
			}
			else{
			empLeaveCtrl.empLeaveForm.days = difference_ms-1;
			}
		    }
		    else if (session1_val == "half_day"){
			empLeaveCtrl.empLeaveForm.days = difference_ms-0.5;
		    }
		    else if (session2_val == "half_day"){
			empLeaveCtrl.empLeaveForm.days = difference_ms-0.5;
		    }
		    
		    else{
			empLeaveCtrl.empLeaveForm.days = difference_ms;
		    }
		    
		    return
		}
            };
	    
    }]);
});
