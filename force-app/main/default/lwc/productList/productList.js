import { LightningElement,api } from 'lwc';

export default class ProductList extends LightningElement {
    @api productdetail;

    addCart(event) {
        let selectedProduct = event.target.dataset.value;
        let selectPriceEntity = event.target.dataset.id;
        const selectedvalue = { cartproduct: this.productdetail.Product2, cartentity: this.productdetail };
        const selectedEvent = new CustomEvent("passvalueorderpage", {
            detail: selectedvalue
        });
        this.dispatchEvent(selectedEvent);
          
      }
}