({


addcerti : function(component, event, helper) {		 

	var name=component.find('name').get('v.value');
    console.log(name);
	var link=component.find('link').get('v.value');
    console.log(link);
	var date=component.find('date').get('v.value');
    console.log(date);
	var certiid=component.get("v.certi_id");
	//apex call for add/edit certificate
	var action=component.get("c.add");
    //set the values
	action.setParams({'certi_id': certiid,'name':name,'link':link,'datee':date});
    action.setCallback(this, function(response) {
        var state = response.getState();
        console.log(state);
       if (state === "SUCCESS") {
                  console.log(state);
                component.find("overlayLib").notifyClose();              
        }
    });
    $A.enqueueAction(action);

    
}

})