import {MetaData} from '../metadata.ts'

export const Middleware = (middleware: Function) => {

    // save middleware to metadata
    return (target: any,  key: string, descriptor: PropertyDescriptor) => {
        MetaData.addMiddleware(middleware, target.constructor.name, descriptor.value);
    };
};
