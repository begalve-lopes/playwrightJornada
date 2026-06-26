import { test } from "../setup/fixtures"
import { gerarPerfil } from "../util/gerarPerfil"

test.describe('Cadastro',()=>{
    test('Deve conseguir fazer cadastro', async ({paginaCadastro})=>{
        const novoUsuario =  gerarPerfil()
        await paginaCadastro.preencherFormulario(novoUsuario);
        await paginaCadastro.submeterFormulario();
    })
})