import { test, expect } from '@playwright/test';

test.describe('Página inicial', () => {
    test('deve visitar a página de home', async ({ page }) => {
        await page.goto('/')
        await expect(page).toHaveURL('http://localhost:4200/home')

        // const tituloPassagens = page.getByRole('heading',{name:'Passagens'})
        // await expect(tituloPassagens).toBeVisible()

        const tituloPassgens = page.getByTestId('titulo-passagens')
        await expect(tituloPassgens).toBeVisible()
    })
})