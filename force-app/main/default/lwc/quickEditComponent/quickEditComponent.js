import { LightningElement, api, track, wire } from 'lwc';
import getConfig from '@salesforce/apex/FetchFormMetadata.fetchMetadataConfig';
export default class QuickEditComponent extends LightningElement {

    @api recordId;
    @api objectApiName;
    @track fieldsToEdit=[];
    @api placeToBeUsed;
    emptyMessage = 'No Configuration found for this component';
    showMessage = false;


    get hasFields() {
        return this.fieldsToEdit.length > 0;
    }

    @wire( getConfig, { 
        objApiNameMeta: '$objectApiName', 
        placeUse: '$placeToBeUsed',
        usedFor: 'Edit Record'
    })
    mdtConfigs({ error, data }) {
        if (data) {
            this.fieldsToEdit = Array.from(data.fieldApiNames).map(item => {
                return { fieldApiName: item, objectApiName: this.objectApiName };
            });
            this.fieldsToEdit.length > 0 ? this.showMessage = false : this.showMessage = true;
        } else if (error) {
            this.error = error;
            console.error('Error fetching config:', error);
        }
    }

    handleSuccess(event) {
        this.dispatchEvent(new CustomEvent('success'));
    }

    handleError(event) {
        this.dispatchEvent(new CustomEvent('error', { 
            detail: {
                errorDetails : event.detail
             }}));
    }
    handleCancel(event) {

        this.dispatchEvent(new CustomEvent('cancel'));
    }
}