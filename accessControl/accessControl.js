const AccessControl = require('role-acl');

// actions.js
const ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  
  LIST: 'list',
  APPROVE: 'approve',
  REJECT: 'reject',
};

// resources.js
const ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student',
};

const RESOURCES = {
  COURSES: 'courses',
  USERTABLE: 'userTable',
  // POST: 'post',
  // COMMENT: 'comment',
  // PRODUCT: 'product',
  // ORDER: 'order',
};




let accessControl = new AccessControl();

accessControl.grant( ROLES.STUDENT)                    

    .execute(ACTIONS.READ).on(RESOURCES.COURSES)

  .grant(ROLES.ADMIN)                 
    .extend(ROLES.STUDENT)                 
    .execute(ACTIONS.READ).on(RESOURCES.COURSES)  
    .execute(ACTIONS.CREATE).on(RESOURCES.COURSES)
    .execute(ACTIONS.DELETE).on(RESOURCES.COURSES)
    .execute(ACTIONS.UPDATE).on(RESOURCES.COURSES)
 
///////////////////////////////////////////
    
module.exports = {accessControl, ACTIONS, RESOURCES,ROLES };