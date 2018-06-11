public with sharing class employeeinfo {
     @AuraEnabled 
    public static user fetchUser(){
      User einfo = [select id,Name,FirstName,LastName
                 FROM User Where id =: userInfo.getUserId()];
        return einfo ;
    }

}