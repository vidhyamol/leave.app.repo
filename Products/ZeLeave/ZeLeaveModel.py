from AccessControl import ClassSecurityInfo
from App.class_init import InitializeClass
from sqlalchemy import and_, or_, case
from sqlalchemy.sql import func
from sqlalchemy.orm import aliased
from sqlalchemy.sql.expression import literal_column

class ZeLeaveModel(object):

    """
    """
    meta_type = "Leave Model"
    security = ClassSecurityInfo()
    security.declareObjectProtected('Access contents information')

InitializeClass(ZeLeaveModel)