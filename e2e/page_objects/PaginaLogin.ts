import { expect, Locator, Page } from "@playwright/test";
import { test as base } from '@playwright/test'

export const test = base.extend<{paginaLogin:PaginaLogin}>({
    paginaLogin:async ({page},use)=>{
        const paginaLogin = new PaginaLogin(page);
        await paginaLogin.visitar();
        await use(paginaLogin);
    }
})

export default class PaginaLogin {
    private readonly page: Page
    private readonly botaoLogin: Locator
    private readonly inputEmail: Locator;
    private readonly inputSenha: Locator;
    private readonly botaoAcessarConta: Locator;

    constructor(page: Page) {
        this.page = page
        this.botaoLogin = page.getByTestId('botao-login')
        this.inputEmail = page.getByTestId('input-email')
        this.inputSenha = page.getByTestId('input-senha')
        this.botaoAcessarConta = page.getByTestId('botao-acessar-conta')
    }

    async visitar() {
        await this.page.goto('/')
        await this.botaoLogin.click()
        await expect(this.page).toHaveURL('/auth/login')
    }

    async fazerLogin(email: string, senha: string) {
        await this.inputEmail.fill(email)
        await this.inputSenha.fill(senha)
    }

    async clicarBotaoAcessarConta() {
        await this.botaoAcessarConta.click()
    }


    async loginFeitoComSucesso() {
        await expect(this.page).toHaveURL('/home')
    }

    async estaMostrandoLoginFalhou(mensagem: string) {
        const elemententoErro = this.page.getByText(mensagem)
        await expect(elemententoErro).toBeVisible()
    }

    async estaMostrandoEmailVazio(alerta: string) {
        const alertaEmail = this.page.getByText(alerta)
        await expect(alertaEmail).toBeVisible()
    }

    async estaMostrandoSenhaVazio(alerta: string) {
        const erro = this.page.locator('mat-error', {
            hasText: 'Senha é obrigatória'
        });

        await expect(erro).toBeVisible();

    }

}