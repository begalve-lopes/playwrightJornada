import { test as base } from '@playwright/test'
import PaginaLogin from '../page_objects/PaginaLogin';
import PaginaPrincipal from '../page_objects/PaginaPrincipal';

export const test = base.extend<{paginaLogin:PaginaLogin, paginaPrincipal:PaginaPrincipal}>({
    paginaLogin:async ({page},use)=>{
        const paginaLogin = new PaginaLogin(page);
        await paginaLogin.visitar();
        await use(paginaLogin);
    },

    paginaPrincipal:async({page}, use)=>{
        const paginaPrincipal = new PaginaPrincipal(page)
        await paginaPrincipal.visitar();
        await use(paginaPrincipal)
    }
})
