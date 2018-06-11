({
   getcontacts: function(component, page, storeOption) {
      var searchValue = component.find("keyword").get('v.value');
      // create a server side action. 
      var action = component.get("c.fetchAccount");
      // set the parameters to method 
      action.setParams({
         "pageNumber": page,
         "storeOption": storeOption,
          "searchkey": searchValue
      });
      // set a call back   
      action.setCallback(this, function(response) {
         // store the response return value (wrapper class insatance)  
         var result = response.getReturnValue();
         console.log(result);
          console.log(result.Contacts);


         component.set("v.contacts", result.Contacts);
         component.set("v.page", result.page);
         component.set("v.total", result.total);
         component.set("v.pages", Math.ceil(result.total / storeOption));
 
      });
      // enqueue the action 
      $A.enqueueAction(action);
   }
})
 
 