function carregar(){
    const container = document.querySelector(".container");

    fetch("http://127.0.0.1:3000/api/users")
    .then( (res) => res.json())
    .then( (dados) =>{
        let saida = "";
        dados.map((res)=>{
            saida+= `<div class="card col-3">
                        <img src="img/user.jpeg" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${res.name}</h5>
                    <p class="card-text">${res.email}</p>
                    <a href="#" class="btn btn-primary" id="atualizar">Atualizar</a>
                    <a href="#" class="btn btn-primary" id="deletar">Deletar</a>
                     </div>
                    </div>`;
        });
        container.innerHTML = saida;
    })
}

document.body.onload = () => {carregar()}


// Fazer a referencia ao botão cadastarar que esta na pagina index.html
const btnCadastrar = document.querySelector("#btnCadastrar");
btnCadastrar.onclick =  () => {
    if (confirm("Você deseja cadastrar este cliente?")==1) {
        fetch("http://127.0.0.1:3000/api/create" , {
            method:"POST",
            headers:{
                "accept":"application/json",
                "content-type":"application/json"
            },
            body:JSON.stringify({
                name:document.querySelector("#txtNome").value,
                email:document.querySelector("#txtEmail").value
            })
        })
        .then((res) =>res.json())
        .then((dados) =>{
            alert(dados);
            document.location.reload()
        })
        .catch((erro) =>{
            console.error(erro)
        })
    }
}
