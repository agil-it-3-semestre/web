import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EquipmentProvider } from '../../providers/equipment.service';
import { SectorProvider } from '../../providers/sector.service';


@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.scss']
})
export class CreateMachineComponent implements OnInit {

  machineForm: FormGroup;
  sectors : any =[];

  constructor(private formBuilder: FormBuilder,
    private equipmentProvider : EquipmentProvider,
    private sectorProvider : SectorProvider) { }

  async createMachine() {

    if (this.machineForm.invalid) {
      alert('Preencha todos os Campos!')
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
        alert(response.body.error)
        return
      }

      alert("Equipamento cadastrado com sucesso!");
      this.machineForm.reset();
    } catch (error) {
      alert(error)
    }
  }

  async getSectors(){
    let sectors = await this.sectorProvider.getList();
    return sectors.body.length > 0 ? sectors.body : [];
  }

  async updateSectors() {
    this.sectors = await this.getSectors()
  }

  ngOnInit() {
    this.updateSectors()
    
    this.machineForm = this.formBuilder.group({
      description: ['', Validators.required],
      sectorId: ['', Validators.required]
    });
  }
}
