({
    detailclick : function(component, event, helper) {
        ;
        var empdetail = $A.get("e.c:personaldetails");
        var id = event.getSource().getLocalId();
        console.log(id);
        empdetail.setParams({ "message" : id});
        empdetail.fire();
        
    }

    
})