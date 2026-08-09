import {hasPermission} from '@/modules/permissions/config/permissions';
export function authorize(role,permission,scope='admin'){return hasPermission(role,permission,scope)}
export function requirePermission(role,permission,scope='admin'){if(!authorize(role,permission,scope)){const err=new Error(`Missing permission: ${permission}`);err.code='FORBIDDEN';throw err}return true}
