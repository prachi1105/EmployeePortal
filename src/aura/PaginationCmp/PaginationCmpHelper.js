({
 GetAllCertificates : function(component){
 		console.log("jaa raha he");
        var action = component.get("c.allemployee");
        action.setStorable();
        action.setCallback(this, function(response){
        	console.log(response.getState());
            if(response.getState()==="SUCCESS"){
                var temp = JSON.stringify(component.get("v.All_Contact"));
                console.log(temp);
                var colleague = JSON.parse(temp);
                console.log("col"+colleague);
                
                var certificates = response.getReturnValue();
                console.log(certificates);
                var temp2 = JSON.stringify(certificates);
                console.log("value has own pahela"+temp2);
                
                

                var custs = [];
                for (var i in colleague ){
                    
                    if (certificates.hasOwnProperty(colleague[i].Id)){
                        custs.push({Name: colleague[i].Name,Id: colleague[i].Id,count: certificates[colleague[i].Id]});
                    }
                    else
                        custs.push({Name: colleague[i].Name,Id: colleague[i].Id ,count: 0});
                    
                }
                var a = component.find("max");
                component.set("v.All_Certi", custs);
                console.log('value custs'+custs);
                var setEvent = component.getEvent("setAttribute");
                console.log(Math.floor((custs.length+4)/5));
                component.set("v.originalValue",Math.floor((custs.length+4)/5))
           setEvent.setParams({"attributeValue":component.get("v.originalValue")});
           console.log(setEvent);
           console.log("Event Fired");
          setEvent.fire();
              this.renderPage(component);   
            }
        });
        $A.enqueueAction(action);
    },
    GetAllContacts : function(component){
        var action = component.get("c.fetchContacts");
        action.setStorable();
        action.setCallback(this, function(response){
            if(response.getState()==="SUCCESS"){
                
             component.set("v.All_Contact",response.getReturnValue()); 
             console.log(component.get("v.All_Contact"));
             this.GetAllCertificates(component);  
         }

    });
     $A.enqueueAction(action);
     },
     renderPage: function(component){
      console.log('renderPage called');

      var toggle = component.get("v.togglePagi");
      if(toggle===true){
       var records= component.get("v.currentList");
       console.log("In the List");
      }
      else
      { 
      var records = component.get("v.All_Certi");
      } 
        var pageNumber = component.get("v.currentPageNumber");
        console.log("pg num"+pageNumber);
        var pageRecords = records.slice((pageNumber-1)*5, pageNumber*5);
        component.set("v.displayList", pageRecords);
     }
})