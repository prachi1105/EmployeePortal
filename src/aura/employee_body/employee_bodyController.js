({


PopulateDetails : function(component, event, helper) {
     helper.fetchdetail(component, event.getParam("message"));
},

myAction : function(component, event, helper) {
console.log('id'+event.getParam("message"));
//helper.selectmethod(event.getParam("message"));
var message = event.getParam("message"); 
switch(message)
        {
            case "p": 
                
                helper.personaldetails(component);
                console.log("personaldetails");
                break;
                
            case "c": helper.certifications(component);
                console.log("certifications");
                break;
                
            case "e": helper.emergencycontact(component);
                console.log("Emergency Contacts");
                break;
                
            case "s": helper.knowurcolleague(component);
                console.log("Search");
                break;
            }

},
handleRecordUpdated: function(component, event, helper) {
var eventParams = event.getParams();
if(eventParams.changeType === "LOADED") {
    // record is loaded (render other component which needs record data value)
    console.log("Record is loaded successfully.");
} else if(eventParams.changeType === "CHANGED") {
    // record is changed
} else if(eventParams.changeType === "REMOVED") {
    // record is deleted
} else if(eventParams.changeType === "ERROR") {
    // there’s an error while loading, saving, or deleting the record
}
},


editcerti : function(component,event,helper){

var idd=event.getSource().get("v.value"); //store index value 

var modalBody;
var info=component.get("v.certiInfo");
console.log(info[idd].Id);
//call custom component to perform edit functionality
$A.createComponent("c:modalContent", {"certi_id":info[idd].Id,"certi_name":info[idd].Name,"certi_link":info[idd].Link__c,"valid_date":info[idd].Valid_Till__c},
                   function(content, status) {
                       if (status === "SUCCESS") {
                           modalBody = content;
                           component.find('overlayLib').showCustomModal({
                               header: "Edit Certificate",
                               body: modalBody, 
                               showCloseButton: true,
                               cssClass: "mymodal",
                               closeCallback: function() {

                               }
                           })
                       }                               
                   });

},

//for add certification 
modal: function(component, evt, helper) {
var modalBody;
$A.createComponent("c:modalContent", {},
                   function(content, status) {
                       if (status === "SUCCESS") {
                           modalBody = content;
                           component.find('overlayLib').showCustomModal({
                               header: "Add Certificate",
                               body: modalBody, 
                               showCloseButton: true,
                               cssClass: "mymodal",
                               closeCallback: function() {
                                   alert('You closed the alert!');
                               }
                           })
                       }                               
                   });
},

delete_emergency_con : function(component, event, helper){
 
console.log("delete emergency contact");
 var result = confirm("Want to delete?");
if (result) {[]
    component.set("v.delemrId",event.getSource().get("v.value"));
    component.set("v.countemergency",true);
    component.find("delemergencycon").reloadRecord();
}



},
emer_con_update : function(component){
component.find("delemergencycon").deleteRecord($A.getCallback(function(deleteResult) {
    if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
        alert("Record is deleted.");
    }               
}));
       
$A.get('e.force:refreshView').fire();  
},
setAttributeValue: function(component,event){
console.log('event handled');
console.log(event);
var eventValue= event.getParam('attributeValue');
console.log(eventValue);  
component.set("v.maxPage", eventValue);
},  

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
});