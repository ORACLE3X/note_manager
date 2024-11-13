class APIError extends Error{
    constructor(msg, status) {
        super(msg);
        this.status =status;        
    }
    static notFound = (msg = "Route not found", status= 404) =>{
        return new this(msg, status);
    };
    static badRequest = (msg = "Invalid Request", status= 400) =>{
        return new this(msg, status);
    };
    static unauthorized (msg, status= 403) {
        const message = msg || `You don't have required permission`;
        return new this (message, status);
    };
    static unauthenticated (msg, status= 401) {
        const message = msg || `You need to login first in order to have access.`;
        return new this (message, status);
    };
    static customError(msg = "Invalid Request", status= 500){
        return new this(msg, status);
    };
}
module.exports={
    APIError,
}
//create a base class that have three properties and three methods or function
//create a derive class that inherit from the base class with its own specific methods, The base class should have a constructor with atleast one params