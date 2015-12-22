'use strict';
define(['leave', 'leaveServices'],
    function (leave) {
        leave.register.controller('empLoginController',
            ['leaveServices', '$state', '_', '$stateParams',
            function(leaveServices, $state, _, $stateParams){
            
            var empLoginCtrl = this;
            empLoginCtrl.loginEmp = function(){      
		_login(empLoginCtrl.empLoginForm);
            };

	    var _login = function(postConfig){
		leaveServices.empLoginValidation(postConfig)
		    .then(function (response) {
			    var data = response.data;
			    ////if empLoginCtrl.empDetails.length == 0:
			    if (data.no_res_msg != ''){
			        empLoginCtrl.empLoginForm.err_msg = data.no_res_msg;
				}

			    else{
				leaveServices.setData(data.items[0]);
			        $state.go('leave.leavebase.empTabPage',{'emp_idn':data.items[0]['Emp_id']});
				}
		});
	
            };    
	    
    }]);
});
