({
	concatename : function(component) {
        var name=component.get("v.firstname");
        var fullname=name;
        name=component.get("v.lastname");
        fullname +=name;
        component.set("v.fname",fullname);
       
		
	}
})