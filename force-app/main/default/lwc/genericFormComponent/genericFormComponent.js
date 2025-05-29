import { LightningElement, api, wire, track } from 'lwc';
import getConfig from '@salesforce/apex/FetchFormMetadata.fetchMetadataConfig';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class GenericFormComponent extends LightningElement {

    @api objApiName;
    @api placeToBeUsed;
    objectApiName;
    fields=[];
    config;
    error;
    titleName;
    pageDomainUrl;
    emptyMessage = 'No Configuration found for this component';
    showMessage = false;


    connectedCallback() {
        this.pageDomainUrl= window.location.origin;
        console.log('Page Domain URL:', this.pageDomainUrl);
        this.titleName = this.objApiName + ' Creation Form';

    }

    get getFields() {
        return this.fields?.length > 0;
    }

    @wire( getConfig, { objApiNameMeta: '$objApiName', placeUse: '$placeToBeUsed', usedFor: 'Both Edit/New Record' })
    mdtConfigs({ error, data }) {
        if (data) {
            this.fields = Array.from(data.fieldApiNames).map(item => {
                return { fieldApiName: item, objectApiName: this.objApiName };
            });
            this.fields.length > 0 ? this.showMessage = false : this.showMessage = true;
        } else if (error) {
            this.error = error;
            console.error('Error fetching config:', error);
        }
    }

    handleSuccess(event) {
        console.log('Record created successfully:', event.detail.id);
        this.showToast('Success', '{0} Record Created Successfully ! Click {1}!', 'success', event.detail.id );
    }
    handleError(event) {
        console.error('Error creating record:', JSON.stringify(event.detail));
        // Optionally, you can show a toast message for the error
        this.showToast('Error', 'Error Occurred ! Please reach out to admin !', 'error', null);
    }

    showToast( title, message, variant, recId ) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            messageData: ['Salesforce', 
                {
                    url: this.pageDomainUrl+'/'+recId,
                    label: 'here',
                    target: '_blank'
                }],
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }


}