/*
O Controlador de dados lida com requisições do usuário e,
também faz as respostas ao usuário.
Portanto, iremos importar as bibliotecas:
Request e Response do framework Express
*/

import { Request, Response } from "express";
/*
Importar a função que traz todos os usuários
*/

import { getAllUser, createUser, updateUser, deleteUser, User } from "../models/userModel";

export async function getUsers(req: Request, res: Response): Promise<void> {



    try {
        const users = await getAllUser();
        res.status(200).json(users)

    }
    catch (error) {
        res.status(500).json(`Erro ao listar os usuários -> ${error}`);
    }
}

/*
a função create cadastra novos usuarios a partir dos dados enviados pelo frontend.
Estes das serão passadas via
request 
*/
export async function create(req: Request, res: Response): Promise<void> {
    try {
        /**
         * a constante user, guarda o usuario enviado pelo 
         * frontEnd e passa para o metodo createUser
         */
        const user: Omit<User, "id"> = req.body
        const rs = await createUser(user);
        res.status(201).json(`Cadastro realizado -> ${rs}`);
    }
    catch (err) {
        res.status(500).json(`Erro ao tentar cadastrar ${err}`);
    }
}

export async function update(req: Request, res: Response): Promise<void> {
    try {
        const user: Omit<User, "id"> = req.body
        const rs = await updateUser(parseInt(req.params.id), user)
        res.status(201).json(`Atualizado -> ${rs}`);
    }
    catch (err) {
        res.status(500).json(`Erro ao tentar cadastrar ${err}`);
    }
}

export async function deleta(req: Request, res: Response): Promise<void> {
    try {
        const rs = await deleteUser(parseInt(req.params.id))
        res.status(201).json(`Atualizado -> ${rs}`);
    }
    catch (err) {
        res.status(500).json(`Erro ao tentar cadastrar ${err}`);
    }
}
