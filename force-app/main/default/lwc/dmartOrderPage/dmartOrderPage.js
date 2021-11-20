import { LightningElement,wire } from 'lwc';
import getProductDetails from '@salesforce/apex/ProductOrderController.getProductDetails';
import getCartProduct from '@salesforce/apex/ProductOrderController.getCartProduct';
import createorderProduct from '@salesforce/apex/ProductOrderController.createorderProduct';
import removeCart from '@salesforce/apex/ProductOrderController.removeCart';
import placedorderProduct from '@salesforce/apex/ProductOrderController.placedorderProduct';
import getBookPrice from '@salesforce/apex/ProductOrderController.getBookPrice';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import { refreshApex } from '@salesforce/apex';

export default class DmartOrderPage extends LightningElement {
    productList;
    productCartList;
    productCartRefreshList
    accId = '0015j00000Ae77aAAB'
    totalPrice = 0;
    totalItem = 0;
    noRecords = false;
    noProductRecords = false;
    searchValue;
    searchproductList;
    allproductList
    filterValue;
    bookPriceOption =[];
    
    connectedCallback() {
        this.noRecords = false;
        this.filterValue= '01s5j000003Z67zAAC'
    }

    getProductDetail() {
        getProductDetails({bookPriceId: this.filterValue})
            .then((result) => {
                this.productList = result;
                this.searchproductList = result;
                this.allproductList = result;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    @wire(getBookPrice) 
        bookPrice(result) {
        if (result.data) {
            this.bookPriceOption = result.data; 
            this.getProductDetail();
        } 
        else if (result.error) {
            console.log(JSON.stringify(result.error));
        }
    }

    handleFilterChange(event){
        this.filterValue = event.detail.value;
        this.searchValue = '';       
        this.getProductDetail();
    }

    @wire(getCartProduct,{accountId: '$accId'}) 
        cartProduct(result) {
        this.productCartRefreshList = result;
        if (result.data) {
            this.productCartList = result.data;
            this.totalItem = this.productCartList.length;
            this.totalPrice = 0;
            if(this.totalItem == 0){
                this.noRecords = true;
            }
            else{
                this.noRecords = false;
            }
            for (let i = 0; i < this.productCartList.length; i++) {
                this.totalPrice = this.totalPrice + this.productCartList[i].UnitPrice
            }          
        } 
        else if (result.error) {
            console.log(JSON.stringify(result.error));
        }
    }
    addToCart(event){
        let cartproduct = event.detail.cartproduct;
        let selectPriceEntity =  event.detail.cartentity;
        createorderProduct({product:cartproduct, priceEntry: selectPriceEntity, accountId: this.accId, quantity: 1})
            .then((result) => {
                refreshApex(this.productCartRefreshList);
                this.showSuccessToast('This Product added in Cart.');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    removeFromCart(event){
        let selectedOrderItemId = event.target.dataset.value;
        let selectedOrderId = event.target.dataset.id;
        removeCart({orderItemId: selectedOrderItemId, orderId: selectedOrderId})
            .then((result) => {
                refreshApex(this.productCartRefreshList);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    changeQuantityValue(event) {
        let lineItemId = event.target.dataset.id;
        let lineItemQuantity = event.target.value;
        let allRecords = JSON.parse(JSON.stringify(this.productCartList));      
        var allRecList = [];
        for (var i = 0; i < allRecords.length; i++) {
            if(allRecords[i].Id == lineItemId) {
                allRecords[i].Quantity = lineItemQuantity;
            }
            allRecList.push(allRecords[i]);
        }
        this.productCartList = [];
        this.productCartList = allRecList;
    }

    placeOrder(event){
        placedorderProduct({lineItemList:this.productCartList} )
            .then((result) => {
                refreshApex(this.productCartRefreshList);
                this.showSuccessToast('Your Order Placed Successfully.');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleSearch(event) {
        this.searchValue = event.target.value;
        let recddis = this.allproductList;
        let allRec = this.allproductList;

        if (this.searchValue.length > 0) {
            recddis = allRec
            .filter(rec => (rec.Product2.Name  != undefined  && rec.Product2.Name.toLowerCase().includes(this.searchValue.toLowerCase())));
            this.productList = [];
            this.productList  = recddis;
            if (this.productList.length == 0) {
                this.noProductRecords = true; 
            }
        }
        if (this.searchValue.length == 0) {
            this.productList =  this.allproductList
            this.noProductRecords = false; 
        }          
    }

    showSuccessToast(messageRec) {
        const evt = new ShowToastEvent({
          title: 'Success',
          message: messageRec,
          variant: "success",
          mode: "dismissable"
        });
        this.dispatchEvent(evt);
      }

}