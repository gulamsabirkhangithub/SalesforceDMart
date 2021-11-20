import { LightningElement,api } from 'lwc';
import Product_Image from "@salesforce/resourceUrl/Product_Image";

export default class ProfileOrderList extends LightningElement {
    productImage1 = Product_Image + '/jacket1.jpeg';
    productImage2 = Product_Image + '/jacket4.jpeg';
    productImage3 = Product_Image + '/shoe1.jpg';
    productImage4 = Product_Image + '/shirt1.jpeg';
    productImage5 = Product_Image + '/shoe2.jpg';
    productImage6 = Product_Image + '/jacket4.jpeg';
    productImage7 = Product_Image + '/shirt2.jpeg';
    productImage8 = Product_Image + '/shoe2.jpg';
    productImage9 = Product_Image + '/shoe3.jpeg';
    productImage10 = Product_Image + '/shirt2.jpeg';


     columns = [
        { image: this.productImage1, label: 'Men Altex Jacket', size: 'Medium',color: 'Black',itemNo:'000123',stock: 'In stock',quantity: '1',dateAdded:'21-09-2021',discountPrice:'$190',price: '$180'},
        { image: this.productImage2, label: 'Men Ams Jacket', size: 'Medium',color: 'Yellow',itemNo:'000124',stock: 'In stock',quantity: '1',dateAdded:'23-08-2021',discountPrice:'$120',price: '$100'},
        { image: this.productImage3, label: 'Men RRL Shoe', size: '8',color: 'Grey',itemNo:'000125',stock: 'In stock',quantity: '1',dateAdded:'01-08-2021',discountPrice:'$90',price: '$80'},
        { image: this.productImage4, label: 'Men LLL Shirt', size: 'Medium',color: 'Green',itemNo:'000126',stock: 'In stock',quantity: '1',dateAdded:'09-07-2021',discountPrice:'$98',price: '$95'},
        { image: this.productImage5, label: 'RRL Shoe', size: '9',color: 'Green',itemNo:'000127',stock: 'In stock',quantity: '1',dateAdded:'06-09-2021',discountPrice:'$99',price: '$88'},
        { image: this.productImage6, label: 'Women ASSL Jacket', size: 'Large',color: 'Yellow',itemNo:'000128',stock: 'In stock',quantity: '1',dateAdded:'21-06-2021',discountPrice:'$90',price: '$80'},
        { image: this.productImage7, label: 'Flexiable Shirt', size: 'Medium',color: 'Blue',itemNo:'000129',stock: 'In stock',quantity: '1',dateAdded:'10-05-2021',discountPrice:'$39',price: '$37'},
        { image: this.productImage9, label: 'Track Shoe', size: '9',color: 'BlacK',itemNo:'000131',stock: 'In stock',quantity: '1',dateAdded:'15-04-2021',discountPrice:'$180',price: '$150'},
    ];


}