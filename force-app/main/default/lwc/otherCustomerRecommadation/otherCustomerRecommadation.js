import { LightningElement } from 'lwc';
import Product_Image from "@salesforce/resourceUrl/Product_Image";

export default class OtherCustomerRecommadation extends LightningElement {
    einsteinImg = Product_Image + '/einstin.jpg';
    productImage1 = Product_Image + '/jacket1.jpeg';
    productImage2 = Product_Image + '/shoe2.jpg';
}