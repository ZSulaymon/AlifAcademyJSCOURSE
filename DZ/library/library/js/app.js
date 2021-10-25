'use strict';

function ajax(
    method,
    url,
    headers,
    {onStart, onSuccess, onError, onFinish},
    body
) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    function isEmpty(obj) {
        for (const key in obj) {
            return true;
        }
        return false;
    }

    if (isEmpty(headers)) {
        for (const [key, value] of Object.entries(headers)) {
            xhr.setRequestHeader(key, value);
        }
    }

    xhr.onloadstart = () => {
        if (typeof onStart === 'function') {
            onStart();
        }
    };

    xhr.onload = () => {
        if (xhr.status < 200 || xhr.status > 299) {
            if (typeof onError === 'function') {
                const error = xhr.statusText;
                onError(error);
                return;
            }
        }
        if (typeof onSuccess === 'function') {
            const data = xhr.responseText;
            onSuccess(data);
        }
    };

    xhr.onerror = () => {
        if (typeof onError === 'function') {
            onError('Network Error');
        }
    };

    xhr.onloadend = () => {
        if (typeof onFinish === 'function') {
            onFinish();
        }
    };

    console.log(xhr);
    xhr.send(body);
}

ajax(
    'GET',
    'http://localhost:9999/api/hw31/error',
    {
        'Content-Type': 'application/json',
    },
    {
        onStart: () => {
            console.log('onStart');
        },
        onFinish: () => {
            console.log('onFinish');
        },
        onError: (error) => {
            console.error('onError: ', error);
        },
        onSuccess: (data) => {
            console.log('onSuccess: ', data);
        },
    }
);