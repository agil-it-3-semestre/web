import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SectorProvider } from '../../providers/sector.service';


@Component({
  selector: 'app-create-sector',
  templateUrl: './create-sector.component.html',
  styleUrls: ['./create-sector.component.scss']
})
export class CreateSectorComponent implements OnInit {

  sectorForm: FormGroup;
  sectors:any = []
  sector:any = {}

  constructor(private formBuilder: FormBuilder,
    private sectorProvider : SectorProvider) { }

  async saveSector() {
    if (this.sectorForm.invalid) {
      alert('Preencha todos os Campos!')
      return
    }

    const id = this.sectorForm.get('id').value;
    if (id=='') {
      this.createSector()
    } else {
      this.updateSector()
    }

  }

  async updateSector() {

    if (this.sectorForm.invalid) {
      alert('Preencha todos os Campos!')
      return
    }

    const id = this.sectorForm.get('id').value;
    const description = this.sectorForm.get('description').value;

    try {
      let response = await this.sectorProvider.updateAttributes(id, {
        description: description
      })
      
      if (response.status !== 200) {
        alert(response.body.error)
        return
      }

      alert("Setor atualizado com sucesso!");

      this.loadSectors();
      this.sectorForm.reset();

    } catch (error) {
      alert(error)
    }
  }

  async createSector() {

    if (this.sectorForm.invalid) {
      alert('Preencha todos os Campos!')
      return
    }

    const description = this.sectorForm.get('description').value;

    try {
      let response = await this.sectorProvider.create({
        description: description
      })
      
      if (response.status !== 200) {
        alert(response.body.error)
        return
      }

      alert("Setor cadastrado com sucesso!");

      this.loadSectors();
      this.sectorForm.reset();

    } catch (error) {
      alert(error)
    }
  }

  async treatSector() {
    let id = this.sectorForm.get('id').value;

    if (typeof id === 'number' && id > 0) {
      await this.loadSectorById(id)
      
      this.sectorForm.controls['id'].setValue(this.sector.id);
      this.sectorForm.controls['description'].setValue(this.sector.description);
    }
  }

  async loadSectors() {
    let sector = await this.sectorProvider.getList()
    this.sectors = sector.body
    this.sectors.push({
      id:'',
      description: 'Novo Setor'
    })
  }

  async loadSectorById(id: number){
    let sector = await this.sectorProvider.get(id)
    this.sector = sector.body
  }

  ngOnInit() {
    this.loadSectors()

    this.sectorForm = this.formBuilder.group({
      id: [''],
      description: ['', Validators.required]
    });
  }
}
