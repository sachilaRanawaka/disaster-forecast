rasm.controller('customeChart',['$scope', '$dashboardChart','$mdDialog', function($scope,$dashboardChart,$mdDialog){     
 $scope.xaxis = "Jan, Feb, Mar,  Apr, May, Jun, Jul, Aug, Sep, Oct, Nov,  Dec";
 $scope.yaxis = "7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6";
$scope.closeDialog = function(){
	$mdDialog.hide()
}

 $scope.saveCustomeChart = function(){
 	var yaxis = [];
 	yaxis = $scope.yaxis.split(",").map(parseFloat);
 	var xaxis = [];
 	xaxis = $scope.xaxis.split(",");

 	var plotOptions = {}
 	if ($scope.chartType == "line") {
 		plotOptions = {
 			line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
 		}
 	}else if($scope.chartType == "pie"){
 		plotOptions = {
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
 		} 		   
 	}else if ($scope.chartType == "bar") {
 		plotOptions = {}
 	}
	$dashboardChart.saveChart({
		highchartsNG : {
	    	options: {
	            chart: {
	                type: $scope.chartType,
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false

	            },
	            title: {
	                text: $scope.title
	            },
	            plotOptions: plotOptions
	        },
	        series:[{
	        	name : $scope.seriesName,
	        	data : yaxis
	        }],
	        xAxis: {
	        	 categories:xaxis
	        },
	        loading: false
	    }, 
	    showChart : true,
	    showBtn : false,
	    chartTitle : $scope.title
	})
	$mdDialog.hide();
 }

}]);