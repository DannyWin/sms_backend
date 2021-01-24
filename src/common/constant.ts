export const auth_userNotFound = {
    status: 404,
    code: 'auth_userNotFound',
    msg: 'Uid or Pwd is wrong',
};
export const login_success = {
    status: 200,
    code: 'login_success',
    msg: 'Login successfully',
};
export const request_success = {
    status: 200,
    code: 'request_success',
    msg: 'Request successfully',
};
export const query_resourceNotFound = (resource: string) => {
    const Resource = resource.substring(0, 1).toUpperCase() + resource.substring(1);
    return { status: 404, code: `query_${resource}NotFound`, msg: `${Resource} is not found` };
};
export const create_resourceCreated = (resource: string) => {
    const Resource = resource.substring(0, 1).toUpperCase() + resource.substring(1);
    return { status: 201, code: `create_${resource}Created`, msg: `${Resource} is created` };
};
export const delete_resourceDeleted = (resource: string) => {
    const Resource = resource.substring(0, 1).toUpperCase() + resource.substring(1);
    return { status: 204, code: `delete_${resource}Deleted`, msg: `${Resource} is deleted` };
};
export const auth_passwordError = {
    code: 'auth_badPassword',
    msg: 'Uid or Pwd is wrong',
};
export const auth_tokenError = {
    status: 401,
    code: 'auth_tokenError',
    msg: 'Token is wrong or expired',
};
export const auth_tokenMissing = {
    status: 401,
    code: 'auth_tokenMissing',
    msg: 'Token is missing',
};
export const auth_requestForbidden = {
    status: 403,
    code: 'auth_requestForbidden',
    msg: 'Request is forbidden',
};
export const param_paramMissing = {
    code: 'param_paramMissing',
    msg: 'One or more params are missing',
};
export const param_paramTypeError = {
    code: 'param_paramTypeError',
    msg: "One or more params' type are wrong",
};
export const unknown_error = {
    code: 'unknown_error',
    msg: 'unknown error',
};
