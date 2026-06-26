import { faker } from "@faker-js/faker/locale/pt_BR";

export enum Genero {
    MASCULINO = 'MASCULINO',
    FEMININO = 'FEMININO',
    OUTRO = 'OUTRO'
}

export type Perfil = {
    nome: string;
    dataNascimento: string; // Mudou de Date para string
    genero: Genero;
    cpf: string;
    telefone: string;
    cidade: string;
    estado: string;
    email: string;
    senha: string;
}

export function gerarPerfil(): Perfil {
    // 1. Gera o objeto Date
    const dataObjeto = faker.date.birthdate({ min: 18, max: 60, mode: 'age' });
    
    // 2. Converte para o formato universal de inputs (AAAA-MM-DD)
    const dataString = dataObjeto.toISOString().split('T')[0]; 

    return {
        nome: faker.person.fullName(), // fullName evita nomes soltos sem apelido
        dataNascimento: dataString,    // Agora passa uma String!
        genero: faker.helpers.enumValue(Genero),
        cpf: faker.string.numeric(11),
        telefone: faker.string.numeric(11),
        cidade: faker.location.city(),
        estado: faker.location.state(),
        email: faker.internet.email(),
        senha: faker.internet.password()
    };
}