const { test, expect } = require('@playwright/test');

test.describe('Vérifications QA', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://127.0.0.1:61433/front-end/index.html');
    });

    test('Vérification des éléments principaux', async ({ page }) => {
        const title = page.getByText('Bienvenue sur notre site');
        const connexion = page.getByText('Se connecter');
        const contact = page.getByText('Contactez-nous');

        await expect(title).toBeVisible();
        await expect(connexion).toBeVisible();
        await expect(contact).toBeVisible();
    });

    test('Connexion et redirection', async ({ page }) => {
        const connexion = page.getByText('Se connecter');
        await connexion.click();
        await page.waitForURL('http://127.0.0.1:61433/front-end/login.html');

        const email = page.getByPlaceholder('Adresse email');
        const password = page.getByPlaceholder('Mot de passe');
        const button = page.getByRole('button', { name: "Se connecter" });
        
        await email.fill('test@exemple.com');
        await password.fill('test');
        await button.click();
    });

    test.only('Vérification du formulaire de contact', async ({ page }) => {
        const contact = page.getByText('Contactez-nous');
        await contact.click();
        await page.waitForURL('http://127.0.0.1:61433/front-end/contact.html');

        const nom = page.getByPlaceholder('Votre nom');
        const message = page.getByPlaceholder('Votre message');
        const bouton = page.getByRole('button', { name: "Envoyer" });

        await nom.pressSequentially('arwouin', { delay: 500 });

        await page.selectOption('select[name="sujet"]', 'Signaler un bug');
        await expect(page.locator('select[name="sujet"]')).toContainText('Signaler un bug');

        await page.setInputFiles('input[name="fichier"]', "C:/Users/tedet/OneDrive/Documents/test.txt");

        await message.pressSequentially('ceci est un message', { delay: 250 });

        await bouton.click();
    });
});