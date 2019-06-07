import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  machines : any =[];
  responsibles : any=[];

  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private equipmentProvider : EquipmentProvider,
    private userProvider : UserProvider,    
    private maintenanceOrderProvider : MaintenanceOrderProvider) { }

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
    const stoppedEquipment = this.orderForm.get('stoppedEquipment').value;
    const plannedStart = this.orderForm.get('plannedStart').value;
    const plannedFinish = this.orderForm.get('plannedFinish').value;
    const programmedStart = this.orderForm.get('programmedStart').value;
    const programmedFinish = this.orderForm.get('programmedFinish').value;
    

    let response = await this.maintenanceOrderProvider.create({
      orderNumber: orderNumber,
      codeABC: codeABC,
      equipmentId: equipmentId,
      maintenanceType: maintenanceType,
      priority: priority,
      responsibleId: responsibleId,
      stoppedEquipment: stoppedEquipment,
      plannedStart: plannedStart,
      plannedFinish: plannedFinish,
      programmedStart: programmedStart,
      programmedFinish: programmedFinish,
      
    })

    alert("Ordem de Manutenção cadastrada com sucesso!");
    this.orderForm.reset();
  }

  async getEquipments(){
    this.machines = JSON.parse(await this.equipmentProvider.getList());

    console.log(JSON.parse(await this.equipmentProvider.getList()));
  }

  async getResponsibles(){
    this.responsibles = JSON.parse(await this.userProvider.getList());

    console.log(JSON.parse(await this.userProvider.getList()));
  }


  ngOnInit() {
    this.getEquipments();
    this.getResponsibles();
    this.orderForm = this.formBuilder.group({
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
    });
  }
}
