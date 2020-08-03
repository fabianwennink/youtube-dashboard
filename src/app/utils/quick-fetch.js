/**
 * Fetch API wrapper.
 *
 * Example usage:
 *
 * quickFetch('https://testapi.com/question', 'POST', {
 *     body: JSON.stringify({answer: answer})
 * }, (response) => {
 *     console.log(response);
 * });
 *
 * @param url The API url.
 * @param method The HTTP method.
 * @param options Any additional request options, like headers and body.
 * @param callback (optional) A callback for when the request is completed.
 */
export function quickFetch(url, method, options = {}, callback = null) {
    const _options = {
        ...options,
        method: method,
        cache: 'no-cache',
        headers: {
            ...options.headers,
            'Content-Type': 'application/json'
        }
    };

    fetch(url, _options)
        .then(response => {
            response.json().then(json => {
                if (callback) {
                    callback(json, response.status);
                }
            });
        }, error => console.log(error));
}
