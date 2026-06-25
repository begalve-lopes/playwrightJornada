import { test } from '@playwright/test'
import PaginaPrincipal from './page_objects/PaginaPrincipal'

test.describe('Buscar passagens', () => {
    test('Deve buscar passagens somente ida', async ({ page }) => {
        const paginaPrincipal = new PaginaPrincipal(page)
        await paginaPrincipal.visitar()

        await paginaPrincipal.definirSomenteIda();
        await paginaPrincipal.abrirModalPassageiros();
        await paginaPrincipal.definirPassageirosAdultos(3);
        await paginaPrincipal.definirPassageirosCriancas(1);
        await paginaPrincipal.definirPassageirosBebes(1);
        await paginaPrincipal.fecharModalPassageiro();

        await paginaPrincipal.definirOrigemEdestino('minas gerais', 'rio de janeiro');
        await paginaPrincipal.definirData(new Date);
        await paginaPrincipal.buscarPassagens();
        await paginaPrincipal.estaMostarandoPassagem('Somente ida', 'Minas Gerais', 'Rio de Janeiro');
    })  
})