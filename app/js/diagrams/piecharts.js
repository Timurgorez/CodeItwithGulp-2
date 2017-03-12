"use strict";


// Make monochrome colors and set them as default for all pies
Highcharts.getOptions().plotOptions.pie.colors = (function () {
    var colors = [],
        base = Highcharts.getOptions().colors[1],
        i;

    for (i = 0; i < 10; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        colors.push(Highcharts.Color(base).brighten((i - 1) / 2).get());
    }
    return colors;
}());

// Build the chart
Highcharts.chart('containerpie', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: ''
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Brands',
        data: [
            { name: 'Austria:', y: 25 },
            { name: 'The Netherlands:', y: 30 },
            { name: 'UK:', y: 45 }
        ]
    }]
});

// Функция переключения с диаграммы на компании и обратно.
function diagramLink(link, classNameLink) {
    $(link).on("click", function(){
        if($(classNameLink).css({'display' : 'block'})) {
            $("#containerpie").css({'display' : 'none'});
            $(".glyphicon-arrow-left").css({'display' : 'block'});
        }
        $(".glyphicon-arrow-left").on("click", function(){
            $(classNameLink).css({'display' : 'none'});
            $(".glyphicon-arrow-left").css({'display' : 'none'});
            $("#containerpie").css({'display' : 'block'});
        });
    });
}

diagramLink(".highcharts-data-label-color-1", ".netherland");
diagramLink(".highcharts-data-label-color-0", ".austria");
diagramLink(".highcharts-data-label-color-2", ".uk");


