({
	generateChart : function(component, event, helper) {
console.log("chRT DETAIL");
var colors=['#FF6384','#1F3976','#36A2EB','#99B641','#bed2ce','#0abc70','#f5b022','#e85e7f','#41B67F']
var action=component.get("c.chart");
console.log(action);
action.setCallback(this, function(response) {
    var state = response.getState();
    if (state === "SUCCESS") {
        var object = response.getReturnValue();
        console.log(object);
       var name=[];
        var count=[];
       for(var i in object) {
            count.push(object[i].expr0);
            name.push(object[i].Name)
         }
        var end = name.length;
         colors.slice(0,end);
var chartdata = {
    labels: name,
    datasets: [
        {
            label:'certificate',
            data: count,
            backgroundColor: colors ,
            borderColor:'rgba(62, 159, 222, 1)',
            fill: false,
            pointBackgroundColor: "#FFFFFF",
            pointBorderWidth: 4,
            pointHoverRadius: 5,
            pointRadius: 3,
            bezierCurve: true,
            pointHitRadius: 10
        }
    ]
}
//Get the context of the canvas element we want to select
var ctx = component.find("linechart").getElement();
var lineChart = new Chart(ctx ,{
    type: 'pie',
    data: chartdata,
    options: {  
        legend: {
            position: 'bottom',
            padding: 10,
        },
        responsive: true
    }
});

}

});
$A.enqueueAction(action);
                }
})