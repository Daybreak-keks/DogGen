const requests = require('request');
const config = require('./config.json')
const fs = require('fs');
const figlet = require('figlet')
const prompt = require('prompt');
function getFox(){
    for (let x = 0; x < config.amount; x++) {
        var options = {url: 'https://randomfox.ca/floof', json:true}
        requests(options, function (error, response, body){
            if (response.statusCode === 200){
                var option2 = {url: body.image, encoding: 'base64'}
                var file_name = body.image.split('/')[4]
                requests(option2, function(error, response, body) {
                    var data = body.replace(/^data:image\/\w+;base64,/, '');
                    fs.writeFileSync(config.directoryPath_fox+'/'+file_name, data, {encoding: 'base64'})
                    console.log('Saved Fox: '+'\x1b[38;5;82m'+file_name+'\x1b[0m');
                })
            }
        })
        
    }
}



function getDoggos(){
    for (let x = 0; x < config.amount; x++) {
        var options = {url: 'https://random.dog/woof.json', json:true}
        requests(options, function (error, response, body){
            if (response.statusCode === 200){
                var option2 = {url: body.url, encoding: 'base64'}
                var file_name = body.url.split('/')[3]
                requests(option2, function(error, response, body) {
                    var data = body.replace(/^data:image\/\w+;base64,/, '');
                    fs.writeFileSync(config.directoryPath_dog+'/'+file_name, data, {encoding: 'base64'})
                    console.log('Saved Dog: '+'\x1b[38;5;82m'+file_name+'\x1b[0m');
                })
            }
        })
        
    }
}

function printBanner() {
    var ascii_txt = figlet.textSync('Dog Gen', {whitespaceBreak: true, font:'Computer'})
    var list_txt = ascii_txt.split(/\r\n|\r|\n/)
    list_txt.forEach(line => {
        console.log('\x1b[38;5;165m'+line+'\x1b[0m')
    });
    console.log('\x1b[38;5;242mMade By Kabion\x1b[0m')
    console.log('1. Get Dogs')
    console.log('2. Get foxs')
}


function start() {
    prompt.start();
    props = [{name: 'Option', warning: 'Option should only be an int.'}]
    prompt.get(props, function(err, result) {
    if (result.Option === '1') {
        getDoggos();
    } else if (result.Option === '2') {
        getFox();
    }
    });
}
printBanner();
start()