import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EquipmentProvider } from '../../../providers/equipment.service'
import { SectorProvider } from '../../../providers/sector.service';
import { DialogHelper } from '../../../shared/helpers/dialog-helper';


@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.scss']
})
export class CreateMachineComponent implements OnInit {

  private machineForm: FormGroup;
  private sectors : any = []
  private machines: any = []
  private machine : any = {}

  private moduleCRUD="Equipamento"

  constructor(private formBuilder: FormBuilder,
    private equipmentProvider : EquipmentProvider,
    private sectorProvider : SectorProvider,
    public dialogHelper: DialogHelper) { }


  async deleteMachine() {
    const id = this.machineForm.get('id').value;
    const description = this.machineForm.get('description').value;

    if (id == '') {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,`Selecione um ${this.moduleCRUD.toLocaleLowerCase()} para deletar`)
      return
    }

    let resposta = await this.dialogHelper.obterConfirmacao(`${this.moduleCRUD}`,`Confirma exclusão do ${this.moduleCRUD.toLocaleLowerCase()} '${description}'?`)

    if (!resposta) {
      return
    }

    try {
      let response = await this.equipmentProvider.delete(id)
      
      if (response.status !== 200) {
        this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,response.body.error)
        return
      }

      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,`${this.moduleCRUD} deletado com sucesso`);
      this.machine={}

      this.reloadObjects();
      this.resetForm()

    } catch (error) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,error)
    }
    
  }
  

  async saveMachine() {

    if (this.machineForm.invalid) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,'Preencha todos os Campos!')
      return
    }

    const id = this.machineForm.get('id').value;
    let operation = 'a atualização'

    if (id === null || id === undefined || id == '') {
      operation = 'o cadastro'
    }

    let resposta = await this.dialogHelper.obterConfirmacao(`${this.moduleCRUD}`,`Confirma ${operation} do ${this.moduleCRUD.toLocaleLowerCase()}?`)

    if (resposta) {
      if (id === null || id === undefined || id == '') {
        this.createMachine()
      } else {
        this.updateMachine()
      }
    }

  }

  async updateMachine() {

    if (this.machineForm.invalid) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,'Preencha todos os Campos!')
      return
    }

    const id = this.machineForm.get('id').value;
    const description = this.machineForm.get('description').value;
    const sectorId = this.machineForm.get('sectorId').value;


    try {
      let response = await this.equipmentProvider.updateAttributes(id, {
        description: description,
        sectorId: sectorId
      })
      
      if (response.status !== 200) {
        this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,response.body.error)
        return
      }

      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,`${this.moduleCRUD} atualizado com sucesso!`);
      this.machine={}

      this.reloadObjects()
      this.resetForm();
    } catch (error) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,error)
    }
  }

  async createMachine() {

    if (this.machineForm.invalid) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,'Preencha todos os Campos!')
      return
    }

    const description = this.machineForm.get('description').value;
    const sectorId = this.machineForm.get('sectorId').value;


    try {
      let response = await this.equipmentProvider.create({
        description: description,
        sectorId: sectorId
      })
      
      if (response.status !== 200) {
        this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,response.body.error)
        return
      }

      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,`${this.moduleCRUD} cadastrado com sucesso!`);
      this.machine={}
      
      this.reloadObjects()
      this.resetForm();
    } catch (error) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,error)
    }
  }

  async treatMachine() {
    let id = this.machineForm.get('id').value;

    if (typeof id === 'number' && id > 0) {
      await this.loadMachineById(id)
      
      this.machineForm.controls['id'].setValue(this.machine.id);
      this.machineForm.controls['description'].setValue(this.machine.description);
      this.machineForm.controls['sectorId'].setValue(this.machine.sectorId);
    }
  }

  async loadMachineById(id: number) {
    let machine = await this.equipmentProvider.get(id)
    this.machine = machine.body
  }

  async getSectors() {
    let sectors = await this.sectorProvider.getList();
    return sectors.body.length > 0 ? sectors.body : [];
  }

  async updateSectors() {
    let sectors = await this.getSectors()
    this.sectors = sectors
  }

  async loadMachines() {
    let machines = await this.equipmentProvider.getList()
    
    this.machines = machines.body
    this.machines.push({
      id:'',
      sectorId: '',
      description: 'Novo Equipamento'
    })
  }

  ngOnInit() {

    this.machineForm = this.formBuilder.group({
      id: [''],
      description: ['', Validators.required],
      sectorId: ['', Validators.required]
    });

    this.updateSectors();
    this.loadMachines();

  }

  reloadObjects() {
    this.updateSectors();
    this.loadMachines();
  }

  resetForm() {

    this.machineForm.reset();

    for( let i in this.machineForm.controls ) {
      this.machineForm.controls[i].setErrors(null);
    }
}

}
