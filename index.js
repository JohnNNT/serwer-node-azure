import http from 'http';

const server = http.createServer((request, response) => {
    const { headers, method, url } = request;

    let body = [];
    request
        .on('error', err => {
            console.error(err);
        })
        .on('data', chunk => {
            body.push(chunk);
        })
        .on('end', () => {
            body = Buffer.concat(body).toString();
            switch(url) {
                case "/":
                    response.setHeader('Content-Type', 'application/json');
                    response.end(JSON.stringify({text: "Goodbye"}));
                    break;
                case "/sortList":
                    response.setHeader('Content-Type', 'application/json');
                    Promise.resolve(body)
                        .then(JSON.parse)
                        .then((unsortedList) => unsortedList.List.toSorted((number1, number2) => number1-number2))
                        .then((sortedList) => JSON.stringify({result: sortedList}))
                        .then((list) => response.end(list))
                    break;
            }
        });
}).listen(3000)