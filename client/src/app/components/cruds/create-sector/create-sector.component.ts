import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SectorProvider } from '../../../providers/sector.service';
import { DialogHelper } from '../../../shared/helpers/dialog-helper';


@Component({
  selector: 'app-create-sector',
  templateUrl: './create-sector.component.html',
  styleUrls: ['./create-sector.component.scss']
})
export class CreateSectorComponent implements OnInit {

  sectorForm: FormGroup;
  sectors:any = []
  sector:any = {}

  private moduleCRUD="Setor"

  constructor(private formBuilder: FormBuilder,
    private sectorProvider : SectorProvider,
    public dialogHelper: DialogHelper) { }

  async deleteSector() {
    const id = this.sectorForm.get('id').value;
    const description = this.sectorForm.get('description').value;

    if (id == '') {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,`Selecione um ${this.moduleCRUD.toLocaleLowerCase()} para deletar`)
      return
    }

    let resposta = await this.dialogHelper.obterConfirmacao(`${this.moduleCRUD}`,`Confirma exclusão do ${this.moduleCRUD.toLocaleLowerCase()} '${description}'?`)

    if (!resposta) {
      return
    }

    try {
      let response = await this.sectorProvider.delete(id)
      
      if (response.status !== 200) {
        this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,response.body.error)
        return
      }

      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,`${this.moduleCRUD} deletado com sucesso`);
      this.sector={}

      this.loadSectors();
      this.resetForm();

    } catch (error) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,error)
    }
    
  }

  async saveSector() {
    if (this.sectorForm.invalid) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,'Preencha todos os Campos')
      return
    }

    const id = this.sectorForm.get('id').value;

    let operation = 'a atualização'

    if (id === null || id === undefined || id == '') {
      operation = 'o cadastro'
    }

    let resposta = await this.dialogHelper.obterConfirmacao(`${this.moduleCRUD}`,`Confirma ${operation} do ${this.moduleCRUD.toLocaleLowerCase()}?`)

    if (resposta) {
      if (id === null || id === undefined || id == '') {
        this.createSector()
      } else {
        this.updateSector()
      }
    }

  }

  async updateSector() {

    if (this.sectorForm.invalid) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,'Preencha todos os Campos')
      return
    }

    const id = this.sectorForm.get('id').value;
    const description = this.sectorForm.get('description').value;

    try {
      let response = await this.sectorProvider.updateAttributes(id, {
        description: description
      })
      
      if (response.status !== 200) {
        this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,response.body.error)
        return
      }

      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,`${this.moduleCRUD} atualizado com sucesso`);
      this.sector={}

      this.loadSectors();
      this.resetForm();

    } catch (error) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,error)
    }
  }

  async createSector() {

    if (this.sectorForm.invalid) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,'Preencha todos os Campos')
      return
    }

    const description = this.sectorForm.get('description').value;

    try {
      let response = await this.sectorProvider.create({
        description: description
      })
      
      if (response.status !== 200) {
        this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,response.body.error)
        return
      }

      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,`${this.moduleCRUD} cadastrado com sucesso`);
      this.sector={}

      this.loadSectors();
      this.resetForm();

    } catch (error) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,error)
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
    this.sectorForm = this.formBuilder.group({
      id: [''],
      description: ['', Validators.required]
    });

    this.loadSectors()
  }

  resetForm() {

    this.sectorForm.reset();

    for( let i in this.sectorForm.controls ) {
        this.sectorForm.controls[i].setErrors(null);
    }
}
}