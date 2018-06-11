({
	greet_text : function() {
        var time= new Date().getHours();
        var text;
        var morning = ('Morning');
        var afternoon = ('Afternoon');
        var evening = ('Evening');
    
        if (time >= 0 && time < 12) {
            text = morning; 
    
        } else if (time >= 12 && time < 17) {
            text = afternoon;
    
        } else if (time >= 17 && time < 24) {
            text = evening;
        }
        
         return text;
        
	}
		
})