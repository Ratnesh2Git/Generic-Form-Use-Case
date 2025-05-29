import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CloseCase extends LightningElement {

    @api recordId;
    @api objectApiName;
    @api placeToBeUsed;
    @track fieldsToEdit=[];

    showCloseCaseComponent=false;

    handleClose() {
        this.showCloseCaseComponent=true;
    }

    handleCancel() {
        this.showCloseCaseComponent=false;
    }

    handleSuccess(event) {
        this.showToast('Success', 'Case Updated Successfully !', 'success');                                                                        
    }
    handleError(event) {
        this.showToast('Error', 'Error Occurred ! Please reach out to admin !', 'error');
    }

    showToast( title, message, variant ) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }
}