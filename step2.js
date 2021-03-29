const fs = require('fs');
const axios = require('axios')

function cat (path) {
    fs.readFile(path, 'utf8', (err, data) => {
        console.log(data)
        if (err) {
            console.log(`Error reading '${path}'`)
            console.log(err)
            process.exit(1);
        }
    });
};

process.argv[2].includes('txt') ? cat(process.argv[2]) : webCat(process.argv[2])

function webCat (url) {
    let response = axios.get(url)
    .then(response => {
        response = response.data
        fs.readFile(response, 'utf8', (err, data) => {
        console.log(data)
        if(err) {
            console.error(err)
            process.exit(1);
            }
        })
    })  
    .catch(() => {
        console.log(`Error fetching ${url}`)
                console.log('Error: Request failed with status code 404')
    })
}