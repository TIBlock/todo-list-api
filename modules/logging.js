//Get current date and time.

function now () {
    const d = new Date();
    return d.toISOString();
}

//Error logging functions.

function info (msg) {
    console.log( 'INFO [' + now() + '] ' + msg);
}

function warn (msg) {
    console.log( 'WARN [' + now() + '] ' + msg);
}

function error (msg) {
    console.log( 'ERROR [' + now() + '] ' + msg);
}

//Module export.

module.exports = {
    info: info,
    warn: warn,
    error: error,
    // debug: debug,
    // fatal: fatal
}