import { app } from '../../../src/app'

export class ModalUndoneController {
    public supervisorPass = ''
 
    static $inject = [
        '$uibModalInstance'
    ];
    constructor(
        private $uibModalInstance: ng.ui.bootstrap.IModalInstanceService
    ) { }

    save() {        
        this.$uibModalInstance.close(this.supervisorPass);
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }

}

app.controller('ModalUndoneController', ModalUndoneController);