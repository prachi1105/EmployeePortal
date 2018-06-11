({
   
       // this function call on the component load first time 

doInit: function(component, event, helper) {
    
    // get the page Number if it's not define, take 1 as default
    var page = component.get("v.page") || 1;
  
        var storeOption = component.find("contactSize").get("v.value");//store option value
     
    helper.getcontacts(component, page, storeOption);

 },
 navigate: function(component, event, helper) {
    
    var page = component.get("v.page") || 1;
    // get the previous button label  
    var direction = event.getSource().get("v.label");
    // get the select option (drop-down) values.  
    var storeOption = component.find("contactSize").get("v.value");
    // set the current page,(using ternary operator.)  
    page = direction === "Previous Page" ? (page - 1) : (page + 1);
    // call the helper function
    helper.getcontacts(component, page, storeOption);

 },

 onSelectChange: function(component, event, helper) {
    // this function call on the select opetion change,  
    var page = 1;
    var storeOption = component.find("contactSize").get("v.value");
    helper.getcontacts(component, page, storeOption);
 },
 showContact : function(component,event,helper){
    //var idx =  event.getSource().get("v.value").Id;
    var idx = event.currentTarget.id;
   // console.log(event.getSource().get("v.value"));
      console.log(idx);
   var navEvt = $A.get("e.force:navigateToSObject");
      navEvt.setParams({
        "recordId": idx,
        "slideDevName": "detail"
      });
      navEvt.fire();
  },
})