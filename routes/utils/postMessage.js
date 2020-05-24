exports.postMessage = function(response,statusCode,messageObject){
    debugger;
    return response.status(statusCode).json(messageObject);
}