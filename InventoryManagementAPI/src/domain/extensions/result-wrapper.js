let Result = {
    status: false,
    data: null,
    errorDescription: null
}

export default function ResultWrapper(status = false, data = null, errorDescription = null) {
    return Result = {
        status,
        data,
        errorDescription
    }
}