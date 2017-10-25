/**
@ngdoc directive
@name umbraco.directives.directive:umbProgressCircle
@restrict E
@scope

@description
Use this directive to render a circular progressbar.

<h3>Markup example</h3>
<pre>
	<div ng-controller="My.Controller as vm">

        <umb-progress-circle
            percentage="80"
            size="60"
            font-size="m"
            stroke-color="green">
        </umb-progress-circle>

	</div>
</pre>


@param {string} size (<code>attribute</code>): This parameter defines the width and the height of the circle in pixels.
@param {string} percentage (<code>attribute</code>): Takes a number between 0 and 100 and applies it to the circle's highlight length.
@param {string} strokeColor (<code>attribute</code>): the color of the highlight (green, purple, red, yellow). Green by default. 
@param {string} fontSize (<code>attribute</code>): Defines the size of the number in the center (xs, s, m, l, xl)
**/




(function (){
    'use strict';

    function ProgressCircleDirective($http, $timeout) {

        function link(scope, element, $filter) {
            
            function onInit() {


                // centering text for all sizes
                var text = element.find(".umb-tour__values");
                
                text.css({ "line-height": scope.size + "px" });
                console.log("this is the size:", scope.size);
                            
                // making sure we get the right numbers
                var percent = scope.percentage;

                if (percent > 100) {
                    percent = 100
                }
                else if (percent < 0) {
                    percent = 0
                }

                // calculating the circle's highlight
                var circle = element.find(".umb-tour__progress-circle");
                var r = circle.attr('r');
                var strokeDashArray = (r*Math.PI)*2;

                // Full circle length
                scope.strokeDashArray = strokeDashArray;

                var strokeDashOffsetDifference = (percent/100)*strokeDashArray;
                var strokeDashOffset = strokeDashArray - strokeDashOffsetDifference;

                // Distance for the highlight dash's offset
                scope.strokeDashOffset = strokeDashOffset;
                var coloring = circle.attr('stroke');

            }

            onInit();
        }


        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/components/umb-progress-circle.html',
            scope: {
                size: "@?",
                percentage: "@",
                strokeColor: "@",
                fontSize: "@"
            },
            link: link

        };

        return directive;
    }

    angular.module('umbraco.directives').directive('umbProgressCircle', ProgressCircleDirective);

})();