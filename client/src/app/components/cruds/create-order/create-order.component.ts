import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EquipmentProvider } from '../../../providers/equipment.service';
import { MaintenanceOrderProvider } from '../../../providers/maintenance-order.service';
import { UserProvider } from '../../../providers/user.service';
import { DialogHelper } from '../../../shared/helpers/dialog-helper';
import { RxwebValidators } from '@rxweb/reactive-form-validators';



@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  orderForm: FormGroup;
  minDate = new Date(2019,1,1);

  machines : any = [];
  responsibles : any = [];
  priorities : any = [];
  maintenanceTypes : any = [];
  orders : any = []
  order : any = {}

  private moduleCRUD="Ordem de Manutenção"

  constructor(private formBuilder: FormBuilder,
    private equipmentProvider : EquipmentProvider,
    private userProvider : UserProvider,
    private maintenanceOrderProvider : MaintenanceOrderProvider,
    public dialogHelper: DialogHelper) { }

  ngOnInit() {
    this.loadOrders()
    this.updateMachines();
    this.updateResponsibles();
    this.priorities = this.getPrioriy();
    this.maintenanceTypes = this.getMaintenanceType();

    this.orderForm = this.formBuilder.group(this.getFormGroup());
  }
  
  reloadObjects() {
    this.updateMachines();
    this.updateResponsibles();
    this.loadOrders();
    this.order = {}
  }

  async deleteOrder() {
    const id = this.orderForm.get('id').value;
    const orderNumber = this.orderForm.get('orderNumber').value;

    if (id == '') {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,`Selecione um ${this.moduleCRUD.toLocaleLowerCase()} para deletar`)
      return
    }

    let resposta = await this.dialogHelper.obterConfirmacao(`${this.moduleCRUD}`,`Confirma exclusão da ${this.moduleCRUD.toLocaleLowerCase()} '${orderNumber}'?`)

    if (!resposta) {
      return
    }

    try {
      let response = await this.maintenanceOrderProvider.delete(id)
      
      if (response.status !== 200) {
        this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,response.body.error)
        return
      }

      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,`${this.moduleCRUD} deletado com sucesso`);

      this.reloadObjects();
      this.resetForm()

    } catch (error) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,error)
    }
    
  }
  
  async saveOrder() {

    let teste=this.getOrderObject()



    if (this.orderForm.invalid) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,'Preencha todos os Campos!')
      return
    }

    const id = this.orderForm.get('id').value;
    let operation = 'a atualização'

    if (id === null || id === undefined || id == '') {
      operation = 'o cadastro'
    }

    let resposta = await this.dialogHelper.obterConfirmacao(`${this.moduleCRUD}`,`Confirma ${operation} da ${this.moduleCRUD.toLocaleLowerCase()}?`)

    if (resposta) {
      if (id === null || id === undefined || id == '') {
        this.createOrder()
      } else {
        this.updateOrder()
      }
    }

  }

  async createOrder() {

    if (this.orderForm.invalid) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,'Preencha todos os Campos!')
      return
    }
    
    let objOrder = this.getOrderObject()
    objOrder['status'] = 'Criado'

    try {
      let response = await this.maintenanceOrderProvider.create(objOrder)
      
      if (response.status !== 200) {
        this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,response.body.error)
        return
      }

      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,`${this.moduleCRUD} cadastrada com sucesso!`);
      this.reloadObjects()
      this.resetForm()
    } catch (error) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,error)
    }
    
  }

  async updateOrder() {

    if (this.orderForm.invalid) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,'Preencha todos os Campos!')
      return
    }
    
    const id = this.orderForm.get('id').value;
    let objOrder = this.getOrderObject()

    try {
      let response = await this.maintenanceOrderProvider.updateAttributes(id,objOrder)
      
      if (response.status !== 200) {
        this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,response.body.error)
        return
      }

      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,`${this.moduleCRUD} atualizada com sucesso!`);
      this.reloadObjects()
      this.resetForm()
    } catch (error) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,error)
    }
    
  }
  async treatOrder() {
    let id = this.orderForm.get('id').value;

    if (typeof id === 'number' && id > 0) {
      await this.loadOrderById(id)
      
      this.orderForm.controls['id'].setValue(this.order.id);
      this.orderForm.controls['orderNumber'].setValue(this.order.orderNumber);
      this.orderForm.controls['codeABC'].setValue(this.order.codeABC);
      this.orderForm.controls['equipmentId'].setValue(this.order.equipmentId);
      this.orderForm.controls['maintenanceType'].setValue(this.order.maintenanceType);
      this.orderForm.controls['priority'].setValue(this.order.priority);
      this.orderForm.controls['responsibleId'].setValue(this.order.responsibleId);
      this.orderForm.controls['stoppedEquipment'].setValue(this.booleanToString(this.order.stoppedEquipment));
      this.orderForm.controls['plannedStart'].setValue(new Date(this.order.plannedStart));
      this.orderForm.controls['plannedFinish'].setValue(new Date(this.order.plannedFinish));
      this.orderForm.controls['programmedStart'].setValue(new Date(this.order.programmedStart));
      this.orderForm.controls['programmedFinish'].setValue(new Date(this.order.programmedFinish));
      this.orderForm.controls['note'].setValue(this.order.note);
      this.orderForm.controls['maintenanceSpot'].setValue(this.order.maintenanceSpot);
    }
  }

  async getEquipments(){
    let machines = await this.equipmentProvider.getList()
    return machines.body.length > 0 ? machines.body : []
  }

  async getResponsibles(){
    let responsibles = await this.userProvider.getList();
    return responsibles.body.length > 0 ? responsibles.body : []
  }

  async updateMachines() {
    this.machines = await this.getEquipments()
  }
  
  async updateResponsibles() {
    this.responsibles = await this.getResponsibles()
  }

  async loadOrders() {
    let orders = await this.maintenanceOrderProvider.getList()
    
    this.orders = orders.body
    this.orders.push({
      id:'',
      orderNumber: 'Nova Ordem de Manutenção'
    })
  }

  async loadOrderById(id: number) {
    let order = await this.maintenanceOrderProvider.get(id)
    this.order = order.body
  }


  getStatus() {
    return [
      'Criado',
      'Em aberto',
      'Iniciado',
      'Pausado',
      'Parado',
      'Cancelado',
      'Pendente assinatura',
      'Pendente finalização',
      'Finalizado'
    ]
  }

  getPrioriy() {
    return ['Baixa', 'Média', 'Alta']
  }

  getMaintenanceType() {
    return ['Corretiva', 'Preventiva', 'Preditiva']
  }

  getFormGroup() {
    return {
      id: [''],
      orderNumber: ['', Validators.required],
      codeABC: ['', Validators.required],
      equipmentId: ['', Validators.required],
      maintenanceType: ['', Validators.required],
      priority: ['', Validators.required],
      responsibleId: ['', Validators.required],
      stoppedEquipment: ['', Validators.required],
      plannedStart: ['', Validators.required],
      plannedFinish: ['', Validators.required],
      programmedStart: ['', Validators.required],
      programmedFinish: ['', Validators.required],
      note: [''],
      maintenanceSpot: ['', Validators.required]
    }
  }

  getFormattedDate(date) {
    let data = new Date(date)
    return data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate()
  }

  getBooleanType(value) {
    return value === 'true' ? true : value === 'false' ? false : value;
  }

  booleanToString(value:Boolean) {
    return value === true ? 'true' : value === false ? 'false' : value;
  }

  private getOrderObject() {
    
    const orderNumber = this.orderForm.get('orderNumber').value;
    const codeABC = this.orderForm.get('codeABC').value;
    const equipmentId = this.orderForm.get('equipmentId').value;
    const maintenanceType = this.orderForm.get('maintenanceType').value;
    const priority = this.orderForm.get('priority').value;
    const responsibleId = this.orderForm.get('responsibleId').value;
    const stoppedEquipment = this.getBooleanType(this.orderForm.get('stoppedEquipment').value);
    const plannedStart = this.getFormattedDate(this.orderForm.get('plannedStart').value);
    const plannedFinish = this.getFormattedDate(this.orderForm.get('plannedFinish').value);
    const programmedStart = this.getFormattedDate(this.orderForm.get('programmedStart').value);
    const programmedFinish = this.getFormattedDate(this.orderForm.get('programmedFinish').value);
    const note = this.orderForm.get('note').value;
    const maintenanceSpot = this.orderForm.get('maintenanceSpot').value

    let objOrder = {
      orderNumber: orderNumber,
      codeABC: codeABC,
      equipmentId: equipmentId,
      maintenanceSpot: maintenanceSpot,
      maintenanceType: maintenanceType,
      priority: priority,
      responsibleId: responsibleId,
      stoppedEquipment: stoppedEquipment,
      plannedStart: plannedStart,
      plannedFinish: plannedFinish,
      programmedStart: programmedStart,
      programmedFinish: programmedFinish,
      note: note
    }
    
    return objOrder
  }

  resetForm() {

    this.orderForm.reset();

    for( let i in this.orderForm.controls ) {
        this.orderForm.controls[i].setErrors(null);
    }
}

}
