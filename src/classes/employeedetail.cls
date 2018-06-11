public with sharing class employeedetail {
@AuraEnabled 
public static Id fetchUserinfo(){
Contact c=[select id from contact where User__c=:userinfo.getuserid() limit 1];
 return (c.id);



//return [select id,Name,FirstName,LastName,Designation__c,Technology__c,Social_Media_Link__c,Interests__c
         //  FROM Contact WHERE name =: userinformation.name];
  
}
@AuraEnabled
public static list<Certificate__c> certificationinfo(){
   User userinformation = [select id from user where id=:userinfo.getuserid()];
 return[SELECT id, Name,Link__c,Valid_Till__c FROM Certificate__c where CreatedById =: userinformation.Id ORDER BY Name  ];
}
@AuraEnabled
public static list<Contact> emergencycontact(){
String user_info = UserInfo.getName();
  system.debug(user_info);
    Contact	con = [select id from Contact where Name=:user_info];
          system.debug(con);
  system.debug([select id,Name,Phone,Email,RelationShip__c from Contact where Contact__c =:con.id]);
	return [select id,Name,Phone,Email,RelationShip__c from Contact where Contact__c =:con.id];
  
}

  @AuraEnabled
public static ConWrapper fetchAccount(Decimal pageNumber ,Integer storeOption,String searchkey) {
  Integer pageSize = storeOption;
  Integer offset = ((Integer)pageNumber - 1) * pageSize;
    if(searchkey == null)
        searchkey = '%';
        else
        searchkey= searchkey+'%';
// create a instance of wrapper class.
ConWrapper obj =  new ConWrapper();
// set the pageSize,Page(Number), total records and accounts List(using OFFSET)   
    obj.pageSize = pageSize;
    obj.page = (Integer) pageNumber;
    obj.total = [SELECT count() FROM Contact WHERE Name  LIKE :searchkey ];
   obj.Contacts = [SELECT Id, Name,Phone,total_certi__c FROM Contact WHERE Name  LIKE :searchkey ORDER BY Name LIMIT :storeOption OFFSET :offset];

return obj;
  

}
@auraenabled
public static List<Contact> fetchContacts(){
return([select id,Name from Contact]);
}
@auraenabled
public static List<Object> chart(){
return([select count(id),name from Certificate__c GROUP BY Name]);
}

     @AuraEnabled
public static Certificate__c add(Id certi_id, String name,String link,String datee){
system.debug(certi_id);
system.debug(name);
system.debug(datee);
String[] strDate = datee.split('-');
Integer myIntDate = integer.valueOf(strDate[1]);
Integer myIntMonth = integer.valueOf(strDate[0]);
Integer myIntYear = integer.valueOf(strDate[2]);
Date d = Date.newInstance( myIntMonth, myIntDate,myIntYear);


 Certificate__c certi=new Certificate__c();
 certi.Name=name;
 certi.Link__c=link;
 certi.Valid_Till__c=d;
 certi.con_certificate__c =fetchUserinfo() ;
 if(certi_id!= null || certi_id!= '')
 {
  certi.Id=certi_id;
 }
 system.debug(certi);
 upsert certi;
 return certi;
  
 
}
}