import { test, expect, Locator } from '@playwright/test';

/**
 * Author Fred JOLYET SII
 */
test('Test Onglet Dictionnaire produits', async ({ page }) => {

    
    await test.step('Connexion Menu Référentiel produits', async () => {

        
        await page.goto('https://dev.ecoglan.fr/');
        await page.getByRole('link', { name: 'Connexion'}).click();
        await page.getByRole('textbox', { name: 'Identifiant*' }).fill('admin@test.fr');
        await page.getByRole('textbox', { name: 'Mot de passe*' }).fill('@Password2025');
        await page.getByRole('button', { name: 'Connexion'}).click();

        await page.getByRole('link', { name: 'Dictionnaire de produits' }).click();

        await expect(page).toHaveURL('https://dev.ecoglan.fr/product/dictionary/');
        await expect(page).toHaveTitle("Liste du dictionnaire de Produits");
        await expect(page.getByText("Référentiel de produits")).toBeVisible();

        
    });

    await test.step('Rechercher PRoduits', async () => {

        await page.getByRole('textbox', { name: 'Rechercher' }).fill('Fraise');
        await expect(page.getByText('Fraise')).toBeVisible();

        
        await expect(page.getByTitle("Modifier l'utilisateur")).toBeEnabled();

    // });
    // await test.step('Ajouter un produit', async () => {

                
    //     await expect(page.getByText('Importer un Fichier Excel', {exact :true})).toBeVisible();
    //     await expect(page.getByText('Sélectionnez le fichier Excel (.xls ou .xlsx)', {exact :true})).toBeVisible();

    //     await page.getByRole('button', { name: 'Sélectionnez le fichier Excel' }).click();

});

})
