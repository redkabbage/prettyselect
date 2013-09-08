var casper = require('casper').create();

casper.start('test-min.html');

casper.waitFor(function check() {
    return this.evaluate(function() {
        return document.querySelectorAll('body').length >= 1;
    });
}, function then() {    // step to execute when check() is ok
    this.captureSelector('site.png', 'body');
}, function timeout() { // step to execute if check has failed
    this.echo("I can't haz my screenshot.").exit();
});

casper.run();