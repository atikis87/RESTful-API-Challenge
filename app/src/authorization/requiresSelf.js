export function requiresSelf(request) {
    const userId = request.params.id;
    const xUserIdHeader = request.getHeader('x-user-id');
    const isSelf = xUserIdHeader === userId;
    if (!isSelf) {
        throw new Error('You are not allowed to do this!');
    }
}
