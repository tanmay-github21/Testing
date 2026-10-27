import { LightningElement } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'; 
import NAME_FIELD from '@salesforce/schema/account.name';
export default class MyAsyncAccountCreate extends LightningElement {
    name=''; accountId;
    handleChange(event){
        this.name=event.target.value;
    }
    async handleSave(){
        const fields={};
        fields[NAME_FIELD.fieldApiName]=this.name;
        const recordInput={apiName:ACCOUNT_OBJECT.objectApiName,fields};
        try{
            const record=await createRecord(recordInput);
            this.accountId=record.id;
            this.dispatchEvent(new ShowToastEvent({
                title:'Success Record Created',
                message:'Record Successfully Created' +'\t'+this.accountId,
                variant:'success'
            }));
        } //end of try
        catch(error){
            this.dispatchEvent(new ShowToastEvent({
                title:'Error creating record',
                message: error.body ? error.body.message : error.message,
                variant:error
            }));
        } //end of catch
    } //end of async function
}