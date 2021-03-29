const fs = require('fs');
const axios = require('axios');
const process = require('process')

function contentOutput(text, out) {
    let file = process.argv.slice(3, 4);
    file = file.toString();
    if(out) {
        fs.writeFile(file, text, 'utf8', function(err) {
            if(err) {
                console.error(`Couldn't write ${file}: ${err}`)
                process.exit(1);
            }
            console.log(`# no output, but ${file} contains contents of ${process.argv[4]}`);
        });
    } else {
        console.log(text);
    }
}

function cat (out, path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if(err) {
            console.error(`Error reading ${path}: ${err}`)
            process.exit(1);
        } 
        contentOutput(data, out);
    });
};


async function webCat(url, out) {
    try {
        let response = await axios.get(url)
        contentOutput(response.data, out)
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}



if ( process.argv[2].includes('txt') ) {cat(undefined, process.argv[2]) } 
if (process.argv[2].includes('--out') && process.argv[4].includes('txt')) {cat(process.argv[2], process.argv[4]) }
if ( process.argv[2].includes('http') ) { webCat(process.argv[2], undefined) }
if ( process.argv[2].includes('--out') && process.argv[4].includes('http')) { webCat(process.argv[4], process.argv[2]) }
