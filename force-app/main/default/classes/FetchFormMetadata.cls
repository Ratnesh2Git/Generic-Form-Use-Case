/**
 * Class to fetch metadata details for generic form componenet.
 */

public with sharing class FetchFormMetadata {


    /**
     * 
     * Method to fetch child metadata for a given parent component.
     */

    @AuraEnabled(cacheable=true)
     public static MetadataConfigs fetchMetadataConfig(String objApiNameMeta, String placeUse, String usedFor) {

        final MetadataConfigs config = new MetadataConfigs();
        config.fieldApiNames = new List<String>();
        
        for(Child_Field_Details__mdt mdt : [Select Id, Label, Use_For__c, Parent_Object_Details__r.Object_API_Name__r.QualifiedApiName, Field_API_Name__r.QualifiedApiName, Parent_Object_Details__r.Place_To_Be_Used__c 
        FROM Child_Field_Details__mdt 
        WHERE Parent_Object_Details__r.Object_API_Name__r.QualifiedApiName = :objApiNameMeta 
        AND 
        Parent_Object_Details__r.Place_To_Be_Used__c = :placeUse
        AND (Use_For__c=:usedFor OR Use_For__c = 'Both Edit/New Record')]) {

            config.metaObjApiName = mdt.Parent_Object_Details__r.Object_API_Name__r.QualifiedApiName;
            config.fieldApiNames.add(mdt.Field_API_Name__r.QualifiedApiName);

        }
        return config;
     }


     /**
      * Wrapper class to hold metadata information
      */

      public class MetadataConfigs {

        @auraEnabled
        public String metaObjApiName { get; set; }
        
        @auraEnabled
        public List<String> fieldApiNames  { get; set; }
      }

}