import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EquipmentProvider } from '../../providers/equipment.service';
import { MaintenanceOrderProvider } from '../../providers/maintenance-order.service';
import { UserProvider } from '../../providers/user.service';



@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  orderForm: FormGroup;
  minDate = new Date();

  machines : any = [];
  responsibles : any = [];
  priorities : any = [];
  maintenanceTypes : any = [];

  constructor(private formBuilder: FormBuilder,
    private equipmentProvider : EquipmentProvider,
    private userProvider : UserProvider,
    private maintenanceOrderProvider : MaintenanceOrderProvider) { }

  ngOnInit() {
    this.updateMachines();
    this.updateResponsibles();
    this.priorities = this.getPrioriy();
    this.maintenanceTypes = this.getMaintenanceType();

    this.orderForm = this.formBuilder.group(this.getFormGroup());
  }

  async createOrder() {

    if (this.orderForm.invalid) {
      alert('Preencha todos os Campos!')
      return
    }
    
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
      note: note,
      status: 'Criado'
    }
    
    try {
      let response = await this.maintenanceOrderProvider.create(objOrder)
      
      if (response.status !== 200) {
        alert(response.body.error)
        return
      }

      alert("Ordem de Manutenção cadastrada com sucesso!");
      this.orderForm.reset();
    } catch (error) {
      alert(error)
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
    return data.getFullYear() + '-' + data.getMonth() + '-' + data.getDate()
  }

  getBooleanType(value) {
    return value === 'true' ? true : value === 'false' ? false : value;
  }
}
