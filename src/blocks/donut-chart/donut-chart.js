
$(document).ready(function(){
   

    let hoveredClass = '';

    $('.donut-chart__legend-list-elem').hover(
        function(){
            let segmentClass = $(this).attr('data-segment-class');
            if(!segmentClass || !segmentClass.length) return;
            
            segmentClass = '.' + segmentClass;
            hoveredClass = segmentClass;

            $(segmentClass).css({
                "stroke-width": "11px",
                "transform": "scale(0.95) translate(3px, 3px)"
            });
        },
        function(){
            $(hoveredClass).removeAttr('style');
        }
    );

    initCharts();

});



function initCharts(){
    $(".donut-chart").each(function(){
        initChart($(this));
    });
}

function initChart($chartElem){

    initGradients();
    initVoteSegments($chartElem);
    
}

function initVoteSegments($chart){

    let votes = getChartVotes($chart);
    let strokeWidth = $chart.attr('data-stroke-width');
    let circleRadius = $chart.attr('data-circle-radius');
    strokeWidth = strokeWidth ? +strokeWidth : 4;
    circleRadius = circleRadius ? +circleRadius : 58;

    let chartSize = calcChartSize(strokeWidth, circleRadius);
    let centerPoint = chartSize / 2;

    let donutChart__chart = $chart.find('.donut-chart__chart');
    donutChart__chart.css({
        width: chartSize, 
        height: chartSize,
        viewBox: `0 0 ${chartSize} ${chartSize}`
    });

    let segments = getVoteSegmentElements(votes, centerPoint, circleRadius);
    $chart.find('.donut-chart__chart-segments').append(segments);

    let totalVotes = getTotalVotes(votes);
    let $chartTextValueElem = $chart.find('.donut-chart__text');

    handleChartItemHover($chart, $chartTextValueElem, totalVotes);
    setChartText($chartTextValueElem, totalVotes);

}

function handleChartItemHover($chart, $chartTextValueElem, totalVotes){

    let hoveredClass = '';

    let itemHoverIn = function(){
        let segmentClass = '.' + $(this).attr('data-segment-class');
            let $segment = $(segmentClass);
            hoveredClass = segmentClass;

            activateSegment($segment, $chartTextValueElem)
    };

    let itemHoverOut = function(){
        let $segment = $(hoveredClass);
        deactivateSegment($segment, $chartTextValueElem, totalVotes);
    }

    $chart.find('.donut-chart__legend-list-elem').hover(itemHoverIn, itemHoverOut);
    $chart.find('.donut-chart__chart-segments path').hover(function(){
        activateSegment($(this), $chartTextValueElem);
    }, function(){
        deactivateSegment($(this), $chartTextValueElem, totalVotes);
    });
}

function activateSegment($segmentElement, $chartTextValueElem){

    if(!$segmentElement.length){
        setChartText($chartTextValueElem, 0);
        return;
    }
    
    let vote = $segmentElement.attr('data-vote');
    let textTheme = $segmentElement.attr('data-text-theme');

    if(vote){
        setChartText($chartTextValueElem, vote, textTheme);
    }

    $segmentElement.css({
        "stroke-width": "11px",
        "transform": "scale(0.95) translate(3px, 3px)"
    });
}

function deactivateSegment($segmentElement, $chartTextValueElem, totalVotes){
    setChartText($chartTextValueElem, totalVotes);
    $segmentElement.removeAttr('style');
}

function setChartText($chartTextValueElem, value, textTheme = ''){
    $chartTextValueElem
        .attr('data-theme', textTheme)
        .find('.donut-chart__value')
        .html(value);
}

function getVoteSegmentElements(votes, centerPoint, circleRadius){
    let segmentAttributes = getVoteSegmentAttributes(votes);
    let totalVotes = getTotalVotes(votes);
    let segments = [];

    votes.reduce( (startDegree, vote, i) => {
        if(vote==0) return startDegree;

        let angle = getArchAngle(vote, totalVotes);

        segments.push( 
            getVoteSegmentElement(segmentAttributes[i], centerPoint, circleRadius, startDegree, angle) 
        );

        return startDegree + angle;
    }, 0);

    return segments;

}

function getVoteSegmentElement({className, textTheme, vote}, centerPoint, circleRadius, startDegree, angle){
    return makeSVG('path', {
        'class': className,
        'data-vote': vote,
        'data-text-theme': textTheme,
        'd': describeArc(centerPoint, centerPoint, circleRadius, startDegree + 1, startDegree + angle - 1)
    });
}

function getTotalVotes(votes){
    return votes.reduce((sum, item) => sum + item, 0);
}

function getArchAngle(vote, totalVotes){
    let percents = vote * 100 / totalVotes; 
    let angle = 360 * percents / 100;

    return angle;
}

function calcChartSize(strokeWidth, circleRadius){
    return circleRadius * 2 + strokeWidth*2;
}

function getVoteSegmentAttributes(votes){
    let classes = [
        {segmentClassName: 'donut-chart__chart-segment-pass', textTheme: 'pass'},
        {segmentClassName: 'donut-chart__chart-segment-good', textTheme: 'good'},
        {segmentClassName: 'donut-chart__chart-segment-nice', textTheme: 'nice'},
        {segmentClassName: 'donut-chart__chart-segment-bad', textTheme: 'bad'},
    ];
    let totalVotes = votes.reduce((sum, item) => sum + item, 0); 

    return votes.map((vote, i) => ({
        className: classes[i].segmentClassName,
        vote: vote,
        textTheme: classes[i].textTheme,
    }));
}

function getChartVotes($chart){
    return $chart
        .attr('data-votes')
        .split(' ')
        .map(item => +item);
}

function calcCircleOffset(circumFerence, prevSegmentsTotalLength, firstSegmentOffset){
    return circumFerence - prevSegmentsTotalLength + firstSegmentOffset;
}

function getDonutSegmentHTML(strokeColor, percent, segmentOffset){
    let strokeDasharay = percent.toString() + ' ' + (100 - percent).toString();
    let segment = makeSVG('circle', {
        class: 'donut-segment',
        cx: '21', cy: '21', r: '15.91549430918954',
        fill: 'transparent', stroke: strokeColor,
        'stroke-width': '1',
        'stroke-dasharray': strokeDasharay,
        'stroke-dashoffset': segmentOffset
    });

    return segment;
}

function makeSVG(tag, attrs={}) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);

    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

function initGradients(){

    let gradientContainerClass = '.donut-chart__gradients';
    let gradientHtmlList = [];
    let gradients = [
        {id: 'markNiceGradient', colors: {from: '#FFE39C', to: '#FFBA9C'} },
        {id: 'markGoodGradient', colors: {from: '#6FCF97', to: '#66D2EA'} },
        {id: 'markPassGradient', colors: {from: '#BC9CFF', to: '#8BA4F9'} },
        {id: 'markBadGradient', colors:  {from: '#919191', to: '#3D4975'} },
    ];

    if($(gradientContainerClass).length){
        return gradients;
    }
    
    for(gradient of gradients){
        gradientHtmlList.push( buildGradientHTML(gradient) );
    }

    let gradientContainer = makeSVG('svg', {
        class: gradientContainerClass,
        'aria-hidden': true,
        focusable: false
    });
    $(gradientContainer).append( makeSVG('defs') ) .append(gradientHtmlList);
    $('body').append(gradientContainer);

    return gradients;
}

function buildGradientHTML({id: id, colors: colors}){
    let stop1 = makeSVG('stop', {'stop-color': colors.from});
    let stop2 = makeSVG('stop', {'stop-color': colors.to, offset: 1});
    let linearGradient = makeSVG('linearGradient', {
        id: id,
        x1: '0%', y1: '0%',
        x2: '0%', y2: '100%',
        gradientUnits: 'objectBoundingBox'
    });

    $(linearGradient).append(stop1, stop2)
    return linearGradient;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}
  
function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

