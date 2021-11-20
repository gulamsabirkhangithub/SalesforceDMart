import { LightningElement,api } from 'lwc';
import Profile_Background from "@salesforce/resourceUrl/Profile_Background";
import Profile from "@salesforce/resourceUrl/Profile";

export default class CustomerProfilePage extends LightningElement {
    proflieImageUrl = Profile;
    backrgroudImageUrl = Profile_Background;
    @api recordId;
}