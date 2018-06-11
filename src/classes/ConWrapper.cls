public class ConWrapper {
@AuraEnabled public Integer pageSize {get;set;}
@AuraEnabled public Integer page {get;set;} 
@AuraEnabled public Integer total {get;set;}  
@AuraEnabled public list<Contact> Contacts {get;set;}
@AuraEnabled public list<Contact> name {get;set;}
@AuraEnabled public list<ConListWrap> conListWrap {get;set;} 

}