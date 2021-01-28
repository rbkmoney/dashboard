// all custom errors in application should extend this class. It's a typescript known issue
export class CustomError extends Error {
    constructor(message?: string) {
        const trueProto = new.target.prototype;
        super(message);

        Object.setPrototypeOf(this, trueProto);
    }
}
