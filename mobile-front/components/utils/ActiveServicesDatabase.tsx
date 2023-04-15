export const getServicesDatabase = async (token: string) => {
    return new Promise((resolve, reject) => {
        fetch('http://api.drainboard.tk/services', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    if (data.services) {
                        resolve(data.services);
                    } else reject('No services returned');
                });
            } else {
                reject(res.status);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

export const updateServicesDatabase = async (services: {}[], token: string) => {
    return new Promise((resolve, reject) => {
        fetch('http://api.drainboard.tk/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({services}),
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    if (data.services) {
                        resolve(data.services);
                    } else reject('No services returned');
                });
            } else {
                reject(res.status);
            }
        }).catch(err => {
            reject(err);
        });
    });
}