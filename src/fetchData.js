function getSuspender(promise) {
    let status = 'pending'
    let response;

    const suspender = promise.then(
        (res) => {
            status = "success"
            response = res
        },
        (err) => {
            status = "error"
            response = err
        }
    );

    const read = () => {
        switch (status) {
            case "pending":
                throw suspender;
            case "error":
                throw response
            default:
                return response

        }
    }

    return { read }
}

export function fetchData(endpoint) {
    let url = "http://localhost:8000/api/"
    const promise = fetch(url+endpoint)
        .then((response) => response.json())
        .then((data) => data)
    console.log(promise);
    return getSuspender(promise);
}