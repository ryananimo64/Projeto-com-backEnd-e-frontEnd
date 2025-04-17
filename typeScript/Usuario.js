var Usuario = /** @class */ (function () {
    function Usuario(nome_usuario, senha_usuario) {
        this.nome_usuario = "";
        this.senha_usuario = "";
        this.email_usuario = "";
        this.nome_usuario = nome_usuario;
        this.senha_usuario = senha_usuario;
    }
    Usuario.prototype.cadastrar = function () {
        console.log("O Usuario ".concat(this.nome_usuario, " foi cadastrado"));
    };
    return Usuario;
}());
var us = new Usuario("kleber", "123");
us.cadastrar();
