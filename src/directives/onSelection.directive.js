'use strict';

angular.module('opengate-angular-js').directive('onSelection', function(RangeService) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            var options = {
                snapToWord: ('snapToWord' in attrs),
                highlight: ('autoHighlight' in attrs)
            };

            element.bind('mouseup', function() {
                if (RangeService.disabled) {
                    return;
                }

                var selection = RangeService.process(options);

                if (selection && selection.getText() && selection.getText().trim() !== '') {
                    scope.$eval(attrs.onSelection, {
                        selection: selection
                    });
                }
            });
        }
    };
});