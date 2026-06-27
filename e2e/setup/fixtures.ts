import { test as base } from '@playwright/test'
import PaginaLogin from '../page_objects/PaginaLogin';
import PaginaPrincipal from '../page_objects/PaginaPrincipal';
import PaginaCadastro from '../page_objects/PaginaCadastro';

export const test = base.extend<{
    paginaLogin: PaginaLogin,
    paginaPrincipal: PaginaPrincipal,
    paginaCadastro: PaginaCadastro
}>({
    paginaLogin: async ({ page }, use) => {
        const paginaLogin = new PaginaLogin(page);
        await use(paginaLogin);
    },

    paginaCadastro: async ({ page }, use) => {
        const paginaCadastro = new PaginaCadastro(page)
        await use(paginaCadastro)
    },

    paginaPrincipal: async ({ page }, use) => {
        const paginaPrincipal = new PaginaPrincipal(page)
        await use(paginaPrincipal)
    }


})
