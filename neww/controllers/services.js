rasm.factory("$dashboardChart",function(){
	var dashboardArr = []
	return {
		saveChart : function(obj){
			dashboardArr.push(obj)
		},
		loadDashboard : function(){
			return dashboardArr;
		},
		deleteChart : function(index){
			dashboardArr.splice(index,1)
		}
	}

})