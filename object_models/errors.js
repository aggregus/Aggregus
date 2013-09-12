var handleError = function handleError(err, customHandlers){
    if(customHandlers[err.code]){
        customHandlers[err.code]();
    }else{
        switch(err.code){
            case "ProvisionedThroughputExceededException":
                break;
            case "ThrottlingException":
                break;
            case "ValidationException":
                break;
            case "InternalServerError":
            case "ResourceNotFoundException":
            case "IncompleteSignatureException":
            case "InternalFailureException":
            case "ServiceUnavailableException":
            default:
                
        }
    }
}