async function getData(url) {
    const res = await fetch(url);

    if (!res.ok) {
        return await Promise.reject(res.status);
    }

    return await res.json();
}

export {getData};

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-type': 'application/json',
        },
        body: data
    });

    if (!res.ok) {
        return await Promise.reject(res.status);
    }

    return await res.json();
};

export {postData};