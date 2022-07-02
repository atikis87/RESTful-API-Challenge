export function requiresAdmin(request) {
    const xRoleHeader = request.getHeader('x-role');
    const isAdmin = xRoleHeader === 'administrator';
    if (!isAdmin) {
        throw new Error('You are not allowed to do this!');
    }
}
