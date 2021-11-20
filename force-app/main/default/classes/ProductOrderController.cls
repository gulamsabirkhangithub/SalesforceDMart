/*Name: ProductOrderController
    Created by : Gulam Sabir Khan
    Date: 18-11-2021
    Description: For D-Mart Mockup*/
    
public without sharing class ProductOrderController {

    //get Book price in picklist
    @AuraEnabled(cacheable=true)    
    public static List<LabelValueItem> getBookPrice() {
        try {
            List<LabelValueItem> priceOptions = new List<LabelValueItem>();
            List<PriceBook2>  priceList = [Select Id,Name from PriceBook2];
            for(PriceBook2 price: priceList){
                priceOptions.add(new LabelValueItem(price.Name,String.ValueOf(price.Id)));
            }
            return priceOptions;
        } 
        catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

    //Display product details
    @AuraEnabled
    public static List<PriceBookEntry> getProductDetails(String bookPriceId) {
        try {
            if(bookPriceId == '') {
                Set<String> duplicatepriceBookEntrySet = new Set<String>();
                List<PriceBookEntry> priceBookEntryDetailsList = new List<PriceBookEntry>();
                List<PriceBookEntry> priceBookEntryList = [SELECT Id,Product2.Id, Product2.Name,Product2.DisplayUrl,Product2.ProductCode,UnitPrice,PriceBook2.Id
                                            FROM PriceBookEntry order by Product2.LastModifiedDate DESC];
                for(PriceBookEntry priceEntity: priceBookEntryList){
                    if(!duplicatepriceBookEntrySet.add(priceEntity.Product2.Id)){
                        priceBookEntryDetailsList.add(priceEntity);
                    }
                }
                return priceBookEntryDetailsList;
            }
            else {

                Set<String> duplicatepriceBookEntrySet = new Set<String>();
                List<PriceBookEntry> priceBookEntryDetailsList = new List<PriceBookEntry>();
                List<PriceBookEntry> priceBookEntryList = [SELECT Id,Product2.Id, Product2.Name,Product2.DisplayUrl,Product2.ProductCode,UnitPrice,PriceBook2.Id
                                        FROM PriceBookEntry where PriceBook2.Id = : bookPriceId  order by Product2.LastModifiedDate DESC];
                for(PriceBookEntry priceEntity: priceBookEntryList){
                    priceBookEntryDetailsList.add(priceEntity);
                }
                return priceBookEntryDetailsList;
            }
        } 
        catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

    //Create order after adding to cart
    @AuraEnabled
    public static void createorderProduct(Product2 product, PriceBookEntry priceEntry,String accountId,Integer quantity) {

        try {
            List<OrderItem> lineItemList = new List<OrderItem>();
                lineItemList = [Select Id, Quantity from OrderItem 
                                Where Order.Status = 'Draft' and Order.AccountId =:accountId and Product2.Id =: product.Id];
        

            if(!lineItemList.isEmpty()){
                List<OrderItem> updateLineItemList = new List<OrderItem>();
                lineItemList[0].Quantity = lineItemList[0].Quantity + quantity;
                updateLineItemList.add(lineItemList[0]);
                update updateLineItemList;
            }
            else{
                Order order = new Order();
                order.AccountId = accountId;
                order.PriceBook2Id = priceEntry.PriceBook2.Id;
                order.EffectiveDate = System.today();
                order.Status = 'Draft';
                insert order;

                OrderItem lineItem = new OrderItem();
                lineItem.OrderId = order.Id;
                lineItem.Quantity = quantity;
                lineItem.UnitPrice = priceEntry.UnitPrice;
                lineItem.Product2id = product.Id;
                lineItem.PricebookEntryId = priceEntry.Id;
                insert lineItem;
            }
        } 
        catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

    //Place order
    @AuraEnabled   
    public static void placedorderProduct(List<OrderItem> lineItemList) {
        try {
            List<Order> updateOrderList = new  List<Order>();
            List<OrderItem> updateLineItemList = new  List<OrderItem>();

            for(OrderItem item: lineItemList) {
                OrderItem itemInstance = new OrderItem ();
                itemInstance.Quantity = item.Quantity;
                itemInstance.Id = item.Id;
                updateLineItemList.add(itemInstance);
                Order orderInstance = new Order();
                orderInstance.Id = item.Order.Id;
                orderInstance.Status = 'Activated';
                updateorderList.add(orderInstance);
            }

            if(!updateorderList.isEmpty()){
                update updateorderList;
            }
            if(!lineItemList.isEmpty()){
                update lineItemList;
            }
        }
        catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

    //Remove product from cart 
    @AuraEnabled   
    public static void removeCart(String orderItemId, String orderId) {
        try {
            Order order = [Select Id from Order where Id=: orderId];
            delete order;
        }
        catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

    //get cart product details  
    @AuraEnabled(cacheable=true)    
    public static List<OrderItem> getCartProduct(String accountId) {
        try {
            List<OrderItem> lineItemList = [Select Id, Quantity,UnitPrice,Product2.Id,Product2.Name,Product2.DisplayUrl,Order.Id,Product2.ProductCode from OrderItem 
                                                    Where Order.Status = 'Draft' and Order.AccountId =:accountId Order by LastModifiedDate DESC];
            return lineItemList;
        } 
        catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}