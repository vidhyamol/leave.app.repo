from AccessControl import ClassSecurityInfo
from App.class_init import InitializeClass
import simplejson as json

class ZeLeaveController(object):

    """
    Zeleave code W.R.T 57 will be part of this file
    And code should be compliance with python standards
    """
    meta_type = "Leave Controller"
    security = ClassSecurityInfo()
    security.declareObjectProtected('Access contents information')


    def empLeaveDetails(self):
        """
        The method is used to get the employee leave information from the request
        and add it in the database.
        Returns:
            JSON: Containing confirmation message for emp details which is saved in the db.
        """
        #import pdb;pdb.set_trace()
        request = self.REQUEST
        data = json.loads(request.get('BODY', "{}"))
        leave_dict = {}
        leave_dict['name'] = str(data.get("name", ''))
        leave_dict['leave_type'] = str(data.get("leave_type", '-'))
        leave_dict['leave_bal'] = data.get("leave_bal",0)
        leave_dict['from_dt'] = str(data.get("from_dt", ''))
        leave_dict['to_dt'] = str(data.get("to_dt", ''))
        leave_dict['days'] = data.get("days", 0)
        leave_dict['approver'] = str(data.get("approver", ''))
        leave_dict['reason'] = str(data.get("reason", ''))
        leave_dict['contact_details'] = str(data.get("contact_details", ''))


        # Insert into EMP_LEAVE_DETAILS table.
        #self.Model.insertEmpLeaveDetails(leave_dict)

        return json.dumps({'msg': 'Leave applied successfully'})


    def empLoginCheck(self):
        """
        Checking login credential and returns the emp details if it valid.

        Returns:
            JSON: containing emp details.
        """
        #import pdb;pdb.set_trace()
        request = self.REQUEST
        login_dict = {}
        data = json.loads(request.get('BODY', "{}"))
        username = data.get('usename', '')
        password = data.get('password', '')

        login_dict['usename'] = username
        login_dict['password'] = password
        
        #emp_result = self.Model.checkEmpLodinData(login_dict).dictionaries()
        emp_result = [{'Name':'Vidhya','Emp_id':611,'Address':'vkfbvk','Designation':'Software Developer','Age':24,'Lead':'Vinod','Manager':'Arivoli','Dob':'08/05/91','Gender':'Female'}]
        if emp_result:
            no_res_msg = ''
        else:
            no_res_msg = 'Invalid credential.'

        #for res in emp_result:
            #res['EMP_IDN'] = network_st

        return json.dumps({'items': emp_result,
                           'no_res_msg': no_res_msg})

    def getLeaveBal(self):
        """
        Returns:
            JSON: containing leave bal.
        """
        #import pdb;pdb.set_trace()
        request = self.REQUEST
        emp_dict = {}
        data = json.loads(request.get('BODY', "{}"))
        emp_idn = data.get('emp_idn', '')
        leave_type = data.get('leave_type', '')

        emp_dict['emp_idn'] = emp_idn
        emp_dict['leave_type'] = leave_type
        
        #leave_bal = self.Model.checkLeaveBal(leave_type).dictionaries()
        leave_bal = 2
        return json.dumps({'leave_bal': leave_bal})
 
                          
InitializeClass(ZeLeaveController)
