({
	helperMethod : function(component) {
        var action = component.get("c.emergencycontact");
        
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){
                component.set("v.conInfo",response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    personaldetails : function(component) {
    	
              var action = component.get("c.fetchUserinfo");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                console.log(storeResponse);
                component.set("v.userInfo", storeResponse);
                component.set("v.num", 'p');
                component.set("v.userDetailCheck",true);
            } 
        });
        $A.enqueueAction(action);
    },
     certifications : function(component) {
    	
            var action = component.get("c.certificationinfo");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                console.log(storeResponse);
                component.set("v.certiInfo", storeResponse);
                component.set("v.num", 'c');
            }
        });
        $A.enqueueAction(action);
    },
     emergencycontact : function(component) {
    	
              var action = component.get("c.emergencycontact");
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                console.log(storeResponse);
                component.set("v.conInfo", storeResponse);
                component.set("v.count_con",component.get("v.conInfo.length"));
                console.log(component.get("v.conInfo.length"));
                component.set("v.num", 'e');
            }
        });
        $A.enqueueAction(action);
    },
     knowurcolleague : function(component) {
    	component.set("v.num", 's');
    },
    
})