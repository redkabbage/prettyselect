var casper = require('casper').create();

casper.test.begin('There sould be two working prettySelect boxes.', 8, function suite(test) {
    casper.start("test-min.html", function () {
        this.waitFor(function check() {
            return this.evaluate(function() {
                return document.querySelectorAll('body').length >= 1;
            });
        }, function then() {    // step to execute when check() is ok
            this.captureSelector('initial.png', 'body');
            this.echo('Initial captured successfully.');

            test.assertNotVisible('select', 'Select boxes are hidden');
            test.assertElementCount('.ps-container', 2, 'There are two prettySelect containers');
            test.assertNotVisible('.ps-drop', 'The drop elements are hidden');

            this.click('#select-1-ps');
            this.click('#select-2-ps');
        }, function timeout() { // step to execute if check has failed
            this.echo("Screen capture failed.").exit();
        });
    });

    casper.then(function () {
        this.captureSelector('open-drops.png', 'body');

        test.assertVisible('.ps-drop', 'The drop elements are visible after a click');
        this.click('#select-1-ps UL.ps-results li[data-val="value3"]');
        this.echo("Post-click screen captured successfully.");
    });

    casper.then(function () {
        test.assertSelectorHasText('#select-1-ps .ps-label', 'Value 3');
        test.assertField('select', 'value3');

        this.click('#select-2-ps UL.ps-results li[data-val="value6"]');
    });

    casper.then(function () {
        test.assertSelectorHasText('#select-2-ps .ps-label', 'Value 6');
        test.assertField('other', 'value6');
        this.captureSelector('finished.png', 'body');
        this.echo("Final screen captured successfully.");
    });

    casper.run(function() {
        test.done();
        this.exit();
    });
});