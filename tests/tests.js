var casper = require('casper').create();

casper.test.begin('There should be two working prettySelect boxes.', 12, function suite(test) {
    casper.start("tests/test-min.html", function () {
        this.waitFor(function check() {
            return this.evaluate(function() {
                return document.querySelectorAll('body').length >= 1;
            });
        }, function then() {    // step to execute when check() is ok
            this.captureSelector('tests/captures/initial.png', 'body');
            this.echo('Initial captured successfully.');

            test.assertNotVisible('select', 'Select boxes are hidden');
            test.assertElementCount('.ps-container', 2, 'There are two prettySelect containers');
            test.assertNotVisible('.ps-drop', 'The drop elements are hidden');

            test.assertExists('.ps-container.wrapper', 'Wrapper class setting was applied correctly');

            this.click('#select-1-ps');
            this.click('#select-2-ps');
        }, function timeout() { // step to execute if check has failed
            this.echo("Screen capture failed.").exit();
        });
    });

    casper.then(function () {
        this.captureSelector('tests/captures/open-drops.png', 'body');
        test.assertVisible('.ps-drop', 'The drop elements are visible after a click');

        this.click('#select-1-ps UL.ps-results li[data-val="value3"]');
        this.echo("Post-click screen captured successfully.");
    });

    casper.then(function () {
        test.assertSelectorHasText('#select-1-ps .ps-label', 'Value 3');
        test.assertField('select', 'value3');

        test.assertEval(function () {
            return !__utils__.findOne('#select-1 option[value="value2"]').getAttribute('selected');
        }, '"Selected" attribute for selector #1 has been moved off the "value2" option');

        test.assertEval(function () {
            return __utils__.findOne('#select-1 option[value="value3"]').getAttribute('selected') === 'selected';
        }, '"Selected" attribute for selector #1 has been moved to "value3" option');

        this.click('#select-2-ps UL.ps-results li[data-val="value6"]');
    });

    casper.then(function () {
        // ensure the <select/> value and "selected" attribute have been moved accordingly
        test.assertSelectorHasText('#select-2-ps .ps-label', 'Value 6');
        test.assertField('other', 'value6');

        test.assertEval(function () {
            return __utils__.findOne('#select-2 option[value="value6"]').getAttribute('selected') === 'selected';
        }, '"Selected" attribute for selector #2 has been moved to "value6" option');

        this.captureSelector('tests/captures/finished.png', 'body');
        this.echo("Final screen captured successfully.");
    });

    casper.run(function() {
        test.done();
        this.exit();
    });
});