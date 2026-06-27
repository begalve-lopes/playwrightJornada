import { testeLogado } from "../setup/testeLogado";

testeLogado.describe('Edição do Usuário',()=>{
    testeLogado('Editar  perfil 1', async({paginaPrincipal})=>{
        await paginaPrincipal.visitar();
    })

    testeLogado('Editar  perfil 2', async()=>{
     
    })
})