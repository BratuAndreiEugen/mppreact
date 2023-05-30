var baseUrl = 'http://localhost:8080/app/artists/';

function status(response) {
    console.log('response status '+response.status);
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}

export function greeting(){
    let headers = new Headers();
    let reqBody = { method: 'GET',
        headers: headers,
        mode: 'cors'
    };
    let request = new Request(baseUrl + 'greeting', reqBody);

    return fetch(request)
        .then(status)
        .then(response => {
            console.log("GREETING : " + response.status)
            var a = response.text()
            console.log(a)
            return a;
        }).catch(e=>{
            console.log("GREETING [E] : " + e);
            return Promise.reject(e);
        })
}

export function getAll(){
    let headers = new Headers()
    let reqBody = {method: 'GET',
        headers: headers,
        mode: 'cors'
    }
    let request = new Request(baseUrl, reqBody);

    return fetch(request)
        .then(status)
        .then(json)
        .then(data => {
            console.log('GETALL : ', data);
            return data;
        }).catch(e =>{
            console.log("GETALL [E] : " + e);
            return Promise.reject(e);
        })
}

export function getOne(id){
    let headers = new Headers()
    let reqBody = {method: 'GET',
        headers: headers,
        mode: 'cors'
    }
    let request = new Request(baseUrl + id, reqBody);
    return fetch(request)
        .then(status)
        .then(json)
        .then(data => {
            console.log('GETONE : ', data);
            return data;
        }).catch(e =>{
            console.log("GETONE [E] : " + e);
            return Promise.reject(e);
        })
}

export function add(concert){
    console.log('BEFORE ADD : '+JSON.stringify(concert));
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let reqBody = {
        method: 'POST',
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(concert)
    };

    return fetch(baseUrl, reqBody)
        .then(status)
        .then(response => {
            var a = response.text();
            console.log("ADD : " + response.status + " " + a)
            return a;
        }).catch(e =>{
            console.log("ADD [E] : " + e);
            return Promise.reject(e);
        })
}

export function remove(id){
    let headers = new Headers();
    let reqBody = {method: 'DELETE',
        headers: headers,
        mode: 'cors'
    }

    return fetch(baseUrl + id, reqBody)
        .then(status)
        .then(response => {
            var a = response.text();
            console.log("DELETE : " + response.status + " " + a)
            return a;
        }).catch(e =>{
            console.log("DELETE [E] : " + e);
            return Promise.reject(e);
        })
}

export function update(id, concert){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let reqBody = {
        method: 'PUT',
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(concert)
    };

    return fetch(baseUrl + id, reqBody)
        .then(status)
        .then(response => {
            var a = response.text();
            console.log("UPDATE : " + response.status + " " + a)
            return a;
        }).catch(e =>{
            console.log("UPDATE [E] : " + e);
            return Promise.reject(e);
        })
}


// JUST TESTS
function addTest(){
    let concert = {
        nume: 'NEW',
        dataStr: '2023-10-09 16:00',
        location: 'Cluj',
        avbSeats: 20,
        soldSeats: 10
    }
    console.log(add(concert))
}

function updateTest(id){
    let concert = {
        nume: 'NEW_MODIFIED',
        dataStr: '2023-10-09 16:00',
        location: 'Cluj',
        avbSeats: 10,
        soldSeats: 20
    }
    console.log(update(id, concert))
}