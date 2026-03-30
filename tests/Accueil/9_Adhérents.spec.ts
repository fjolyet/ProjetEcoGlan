import { test, expect, Locator } from '@playwright/test';

/**
 * Author Fred JOLYET SII
 */
test('Test Onglet Adhérents', async ({ page }) => {

    
    await test.step('Connexion Menu Adhérents', async () => {

        
        await page.goto('https://dev.ecoglan.fr/');
        await page.getByRole('link', { name: 'Connexion'}).click();
        await page.getByRole('textbox', { name: 'Identifiant*' }).fill('admin@test.fr');
        await page.getByRole('textbox', { name: 'Mot de passe*' }).fill('@Password2025');
        await page.getByRole('button', { name: 'Connexion'}).click();

        await page.getByRole('link', { name: 'Adhérents' }).click();

        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/adherents');
        await expect(page).toHaveTitle("Liste des Adhérents");

    });

    await test.step('Pagination Liste Adhérents', async () => {

        await expect (page.getByRole('combobox', { name :'Afficher :'})).toContainText('10 par page');

        await page.getByLabel('Afficher :').selectOption('10');
        await page.goto('https://dev.ecoglan.fr/admin/adherents?search=admin%40test.fr&limit=10');
        await page.getByLabel('Afficher :').selectOption('50');
        await page.goto('https://dev.ecoglan.fr/admin/adherents?search=admin%40test.fr&limit=50');
        await page.getByLabel('Afficher :').selectOption('100');
        await page.goto('https://dev.ecoglan.fr/admin/adherents?search=admin%40test.fr&limit=100');
        await page.getByRole('searchbox', { name: 'Rechercher' }).click();
});

    await test.step('Rechercher Adhérents', async () => {

        await page.getByRole('searchbox', { name: 'Rechercher' }).fill('admin@test.fr');
        await page.getByRole('searchbox', { name: 'Rechercher' }).press('Enter');

        await expect(page.getByText('admin@test.fr')).toBeVisible();
    });
    await test.step('Importer Excel', async () => {

        await page.getByRole('button', { name: ' Importer Excel' }).click();
                
        await expect(page.getByText('Importer un Fichier Excel', {exact :true})).toBeVisible();
        await expect(page.getByText('Sélectionnez le fichier Excel (.xls ou .xlsx)', {exact :true})).toBeVisible();

        await page.getByRole('button', { name: 'Sélectionnez le fichier Excel' }).click();

});
})