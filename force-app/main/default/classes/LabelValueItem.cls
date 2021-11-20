/*Name: ProductOrderController
    Created by : Gulam Sabir Khan
    Date: 18-11-2021
    Description: for picklist value*/

public without sharing class LabelValueItem {
    @AuraEnabled
    public String label;
    @AuraEnabled
    public String value;

    public LabelValueItem(String label, String value) {
        this.label = label;
        this.value = value;
    }
}