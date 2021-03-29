const fs = require('fs');

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

cat(process.argv[2])

module.exports = {
    cat: cat
}

