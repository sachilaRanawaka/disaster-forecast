rasm.factory("$dashboardChart",function(){
	var dashboardArr = [{
		item: 1,
		showChart:false,
		showBtn : true,
		widgets :[{
			col: 0,
			row: 0,
			sizeY: 3,
			sizeX: 3
		}]
	}]
	return {
		saveFirstChart : function(obj){
			dashboardArr[0] = obj;
		},
		saveChart : function(obj){
			dashboardArr.push(obj)
		},
		loadDashboard : function(){
			return dashboardArr;
		},
		deleteChart : function(index){
			dashboardArr.splice(index,1)
		},
		deleteFirstChart :function(index){
			dashboardArr.splice(index,1);
			dashboardArr = [{
				item: 1,
				showChart:false,
				showBtn : true
			}]
			
		}
	}

})