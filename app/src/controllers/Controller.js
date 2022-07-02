export default class Controller {
    static PROTECTED_FIELDS = ['id'];

    static checkForProtectedFields(fieldsObj) {
        const protectedFieldsInFieldsObj = Object.keys(fieldsObj).filter(key => Controller.PROTECTED_FIELDS.includes(key));
        if (protectedFieldsInFieldsObj.length) {
            throw new Error('Cannot update protected fields: ' + protectedFieldsInFieldsObj);
        }
    }
}