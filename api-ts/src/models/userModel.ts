// Importar a biblioteca do ROW(Linha)Data(Dados)(Pacote)
//Guardar todos os dados que retorna na consulta select
//O comando ResultSetHeader é utilizado para executar
//as consultas de modificações das tabelas.
//Insert ,Update,Delete
import { RowDataPacket, ResultSetHeader } from "mysql2";

// Importando a conexão (pool) com o banco de dados para
// fazer uma consulta nas tabelas do banco
import pool from "../database";

// A interface User faz uma descrição da estrutura de dados
// de dadps da tabela usuário
export interface User extends RowDataPacket {
    id: number;
    name: string;
    email: string;
}

// Exportar a função getAllUsers(PegarTodosOsUsuários) do banco de dados
// Esta função é do tipo ascíncrona e, portanto, aguarda um processamento interno para realizar a exportação
// O processamento será feito pela linha await(aguardar)

export async function getAllUser(): Promise<User[]> {
    const [rows] = await pool.query<User[]>("Select * from users", []);
    return rows;
}

// função para cria um novo usuario
// aguarda o úsuario ser cadastrado. portanto,estamos
//usando a função async....await
/*
Para cadastrar o usuario sera necessario passar o 
usuario por parmetro e , ele será gerenciado pelo seu id
*/
export async function createUser(user: Omit<User, 'id'>): Promise<ResultSetHeader> {
    try {/**
      * vamos usar o comando insert para cadastrar o usuario
        nobanco de dados. estamos usando também o comando 
        await que irá esperar pelo cadasro completo do usuario.
        na consulta do insert está sendo passada 2 parametros
        com o simbolo de ?. Consultas parametrizadas evitam
        a injeção de sql
      */
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [user.name, user.email]
        );
        return result;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}


export async function updateUser(id: number, user: Omit<User, 'id'>): Promise<ResultSetHeader> {
    try {
        const [result] = await pool.execute<ResultSetHeader>(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [user.name, user.email, id]
        );
        return result;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
}

//Função para apagar o usuario

export async function deleteUser(id: number): Promise<ResultSetHeader> {
    try {
        const [result] = await pool.execute<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
}