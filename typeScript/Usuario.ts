class Usuario{
    nome_usuario:string ="";
    senha_usuario:string="";
    email_usuario:string="";

    constructor(nome_usuario:string,senha_usuario:string){
        this.nome_usuario = nome_usuario;
        this.senha_usuario = senha_usuario;
    }

    cadastrar(){
        console.log(`O Usuario ${this.nome_usuario} foi cadastrado`);
    }
}

let us = new Usuario("kleber","123");
us.cadastrar();