({
	currentYear : function(component, event, helper) {
        var d = new Date();
		var n = d.getFullYear();
        component.set("v.year",n);
		
	}
})