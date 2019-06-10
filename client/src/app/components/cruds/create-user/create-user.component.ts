import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../../providers/user.service';
import { DialogHelper } from '../../../shared/helpers/dialog-helper';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;
  roles: any = []
  genders: any = []
  users: any = []
  user: any = {}
  
  moduleCRUD = "Usuário"
  hidePassword = true;

  constructor(private formBuilder: FormBuilder,
    private userProvider : UserProvider,
    public dialogHelper: DialogHelper) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group(this.getFormGroup());
    this.reloadObjects()
  }

  async deleteUser() {
    const id = this.userForm.get('id').value;
    const name = this.userForm.get('name').value;

    if (id == '') {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,`Selecione um ${this.moduleCRUD.toLocaleLowerCase()} para deletar`)
      return
    }

    let resposta = await this.dialogHelper.obterConfirmacao(`${this.moduleCRUD}`,`Confirma exclusão do ${this.moduleCRUD.toLocaleLowerCase()} '${name}'?`)

    if (!resposta) {
      return
    }

    try {
      let response = await this.userProvider.delete(id)
      
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
  
  async saveUser() {

    if (this.userForm.invalid) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,'Preencha todos os Campos!')
      return
    }

    const id = this.userForm.get('id').value;
    let operation = 'a atualização'

    if (id === null || id === undefined || id == '') {
      operation = 'o cadastro'
    }

    let resposta = await this.dialogHelper.obterConfirmacao(`${this.moduleCRUD}`,`Confirma ${operation} do ${this.moduleCRUD.toLocaleLowerCase()}?`)

    if (resposta) {
      if (id === null || id === undefined || id == '') {
        this.createUser()
      } else {
        this.updateUser()
      }
    }

  }

  async createUser() {

    if (this.userForm.invalid) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,'Preencha todos os Campos!')
      return
    }
    
    let objUser = this.getUserObject()

    try {
      let response = await this.userProvider.create(objUser)
      
      if (response.status !== 200) {
        this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,response.body.error)
        return
      }

      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,`${this.moduleCRUD} cadastrado com sucesso!`);
      this.reloadObjects()
      this.resetForm()
    } catch (error) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,error)
    }
    
  }

  async updateUser() {

    if (this.userForm.invalid) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,'Preencha todos os Campos!')
      return
    }
    
    const id = this.userForm.get('id').value;
    let objUser = this.getUserObject()

    try {
      let response = await this.userProvider.updateAttributes(id,objUser)
      
      if (response.status !== 200) {
        this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,response.body.error)
        return
      }

      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,`${this.moduleCRUD} atualizado com sucesso!`);
      this.reloadObjects()
      this.resetForm()
    } catch (error) {
      this.dialogHelper.enviarMensagem(`${this.moduleCRUD}`,error)
    }
    
  }
  
  async treatUser() {
    let id = this.userForm.get('id').value;

    if (typeof id === 'number' && id > 0) {
      await this.loadUserById(id)
      
      this.userForm.controls['id'].setValue(this.user.id);
      this.userForm.controls['name'].setValue(this.user.name);
      this.userForm.controls['role'].setValue(this.user.role);
      this.userForm.controls['email'].setValue(this.user.email);
      this.userForm.controls['contact'].setValue(this.user.contact);
      this.userForm.controls['bornDate'].setValue(new Date(this.user.bornDate));
      this.userForm.controls['password'].setValue(this.user.password);
      this.userForm.controls['forceChangePassword'].setValue(this.user.forceChangePassword);
      this.userForm.controls['gender'].setValue(this.user.gender);
    }
  }

  generatePassword() {
    this.user.password = Math.random().toString(36).substring(2, 15);
    this.userForm.controls['password'].setValue(this.user.password);
  }

  getFormGroup() {
    return {
      id: [''],
      name: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      forceChangePassword: [''],
      contact: ['', Validators.required],
      bornDate: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required]
    }
  }

  reloadObjects() {
    this.updateRoles();
    this.updateGenders();
    this.loadUsers();
  }

  updateRoles() {
    this.roles = [
      {
        id: 'Administrator',
        name: 'Administrador'
      },
      {
        id: 'Maintainer Leader',
        name: 'Líder de Manutenção'
      },
      {
        id: 'Maintainer',
        name: 'Manutentor'
      },
      {
        id: 'Worder',
        name: 'Operador'
      }
    ]
  }

  updateGenders() {
    this.genders = [
      {
        id: 'Masculino',
        name: 'Masculino'
      },
      {
        id: 'Feminino',
        name: 'Feminino'
      }
    ]
  }

  async loadUsers() {
    let users = await this.userProvider.getList()
    
    this.users = users.body
    this.users.push({
      id:'',
      name: 'Novo Usuário'
    })
  }

  async loadUserById(id: number) {
    let user = await this.userProvider.get(id,[{name: 'showPassword', value:'true'}])
    this.user = user.body
  }

  getUserObject() {
    
    const name = this.userForm.get('name').value;
    const role = this.userForm.get('role').value;
    const email = this.userForm.get('email').value;
    const gender = this.userForm.get('gender').value;
    const contact = this.userForm.get('contact').value;
    const bornDate = this.userForm.get('bornDate').value;
    const password = this.userForm.get('password').value;
    const forceChangePassword = this.userForm.get('forceChangePassword').value;

    let objUser ={
      name: name,
      role: role,
      email: email,
      gender: gender,
      contact: contact,
      bornDate: bornDate,
      password: password,
      forceChangePassword: forceChangePassword
    }

    return objUser
  }

  resetForm() {

    this.userForm.reset();

    for( let i in this.userForm.controls ) {
      this.userForm.controls[i].setErrors(null);
    }
  }
}
