import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router, 
    private equipmentProvider : EquipmentProvider,
    private sectorProvider : SectorProvider) { }

  async createMachine() {

    if (this.machineForm.invalid) {
      alert('Preencha todos os Campos!')
      return
    }

    const description = this.machineForm.get('description').value;
    const sectorId = this.machineForm.get('sectorId').value;

    let response = await this.equipmentProvider.create({
      description: description,
      sectorId: sectorId
    })

    alert("Equipamento cadastrado com sucesso!");
    this.machineForm.reset();
  }

  async getSectors(){
    this.sectors = JSON.parse(await this.sectorProvider.getList());
  }

  ngOnInit() {
    this.getSectors();
    this.machineForm = this.formBuilder.group({
      description: ['', Validators.required],
      sectorId: ['', Validators.required]
    });
  }
}
