'use strict';
define(['leave', 'leaveServices'],
    function (leave) {
        leave.register.controller('empTabController',
            ['$scope','leaveServices','$state','_', '$stateParams', 'jDateService', '$filter','memlstService',
            function($scope, leaveServices, $state, _, $stateParams, jDateService, $filter, memlstService){
            var empTabCtrl = this;
	    empTabCtrl.first = true;
	    empTabCtrl.second = false;
	    empTabCtrl.emp_idn = $stateParams.emp_idn;
	    empTabCtrl.empDemoForm = {};
	    empTabCtrl.empLeaveForm = {};
	    empTabCtrl.allCals = {};
	    empTabCtrl.emp_idn = $stateParams.emp_idn;
	    empTabCtrl.empData = leaveServices.getData();
            empTabCtrl.dateFilter = $filter('date');
            empTabCtrl.datePickerformat = jDateService.getDateFormat();

	    empTabCtrl.applyLeaveForEmp = function(){
		empTabCtrl.second = false;
		empTabCtrl.first = true;
	    };
	    
	    empTabCtrl.empDemographic = function(){
		empTabCtrl.first = false;
		empTabCtrl.second = true;
	    };	 
	    
	    empTabCtrl.empDataLoad = function(){
                empTabCtrl.empDemoForm.empNo= $stateParams.emp_idn;
		empTabCtrl.empDemoForm.empName = empTabCtrl.empData.Name;
		empTabCtrl.empDemoForm.address = empTabCtrl.empData.Address;
		empTabCtrl.empDemoForm.gender = empTabCtrl.empData.Gender;
		empTabCtrl.empDemoForm.dob = empTabCtrl.empData.Dob;
		empTabCtrl.empDemoForm.empAge = empTabCtrl.empData.Age;
		empTabCtrl.empDemoForm.designation = empTabCtrl.empData.Designation;
		empTabCtrl.empDemoForm.lead = empTabCtrl.empData.Lead;
		empTabCtrl.empDemoForm.manager = empTabCtrl.empData.Manager;
            };

            empTabCtrl.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
            empTabCtrl.toggleCal = function ($event, calarg) {
                $event.preventDefault();
                $event.stopPropagation();
                empTabCtrl.allCals[calarg] = true;
            };
	    

            empTabCtrl.cancelLeaveApplication = function(){
		empTabCtrl.first = true;
		empTabCtrl.second = false;
            };
	    empTabCtrl.calcLeaveBalCount = function(){
                var leave_type= empTabCtrl.empLeaveForm.leave_type;
		empTabCtrl.empLeaveForm['emp_idn'] = $stateParams.emp_idn;
		_getLeaveBal(empTabCtrl.empLeaveForm);
		
            };
	     var _getLeaveBal = function(postConfig){
          
		leaveServices.getLeaveBal(postConfig)
		    .then(function (response) {
			 var data = response.data;
			 empTabCtrl.empLeaveForm.leave_bal = data.leave_bal;
		});
	
            };
	     empTabCtrl.empNameLoad = function(){
		empTabCtrl.empLeaveForm.name = empTabCtrl.empData.Name;
	     };

            empTabCtrl.applyNewLeaveRequest = function(){
                if (!empTabCtrl.empLeaveForm.leave_type)
                    $window.alert("Please select Leave Type.");
                else if (!empTabCtrl.empLeaveForm.from_dt || !empTabCtrl.empLeaveForm.to_dt)
                    $window.alert("Please specify valid date range.");
		else if (empTabCtrl.empLeaveForm.from_dt >empTabCtrl.empLeaveForm.to_dt)
                    $window.alert("From Date is greater than ToDate.");
		else if (empTabCtrl.empLeaveForm.days >empTabCtrl.empLeaveForm.leave_bal)
                    $window.alert("You don't have enough leave balance to avail the Earned Leave.");
		else if (!empTabCtrl.empLeaveForm.reason )
                    $window.alert("Please enter the reason for leave.");
		else if (!empTabCtrl.empLeaveForm.contact_details )
                    $window.alert("Please enter contact details.");
		    
                else {
                    empTabCtrl.empLeaveForm.from_dt = empTabCtrl.dateFilter(empTabCtrl.empLeaveForm.from_dt, empTabCtrl.datePickerformat);
                    empTabCtrl.empLeaveForm.to_dt = empTabCtrl.dateFilter(empTabCtrl.empLeaveForm.to_dt, empTabCtrl.datePickerformat);
                    empTabCtrl.empLeaveForm['emp_idn'] = $stateParams.emp_idn;
                    _applyLeave(empTabCtrl.empLeaveForm);
                }
            };

            var _applyLeave = function(postConfig){
          
		leaveServices.applyEmpLeave(postConfig)
		    .then(function (response) {
		    var data = response.data;
		    empTabCtrl.empLeaveForm.msg = data.msg;
		});
	
            };

            empTabCtrl.calculateLeaveCount = function(obj, from_dt){
		var to_dt= obj.empTabCtrl.empLeaveForm.to_dt;
		if (!from_dt || !to_dt)
                    $window.alert("Please specify valid date range.");
		else if (from_dt >to_dt)
                    $window.alert("From Date is greater than ToDate.");
		else{
		    var one_day,date1_ms,date2_ms,difference_ms,session1_val,session2_val;
		    session1_val = obj.empTabCtrl.empLeaveForm.session1_type;
		    session2_val = obj.empTabCtrl.empLeaveForm.session2_type;
		    one_day=1000*60*60*24;//Get 1 day in milliseconds
		    date1_ms = from_dt.getTime();// Convert both dates to milliseconds 
		    date2_ms = to_dt.getTime();
		    difference_ms = Math.round((date2_ms - date1_ms)/one_day);// Calculate the difference in milliseconds and Convert back to days
		    difference_ms = difference_ms+1;
		    if ((session1_val == "half_day")&&(session2_val == "half_day")){
			if (difference_ms == 1){
			empTabCtrl.empLeaveForm.days = 0.5;
			}
			else{
			empTabCtrl.empLeaveForm.days = difference_ms-1;
			}
		    }
		    else if (session1_val == "half_day"){
			empTabCtrl.empLeaveForm.days = difference_ms-0.5;
		    }
		    else if (session2_val == "half_day"){
			empTabCtrl.empLeaveForm.days = difference_ms-0.5;
		    }
		    
		    else{
			empTabCtrl.empLeaveForm.days = difference_ms;
		    }
		    
		    return
		}
            };
    }]);
});
