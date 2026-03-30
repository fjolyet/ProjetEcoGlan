import { test, expect, Locator } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Test Produits', async ({ page }) => {



    await page.goto('https://dev.ecoglan.fr/');

    
    await test.step('Page Produits', async () => {

        
        await page.goto('https://dev.ecoglan.fr/');
        await page.getByRole('link', { name: 'Connexion'}).click();
        await page.getByRole('textbox', { name: 'Identifiant*' }).fill('admin@test.fr');
        await page.getByRole('textbox', { name: 'Mot de passe*' }).fill('@Password2025');
        await page.getByRole('button', { name: 'Connexion'}).click();

        await page.getByRole('link', { name: 'Produits', exact :true }).click();


        // Naviguer sur les onglets de la page campagne
        await expect(page).toHaveURL('https://dev.ecoglan.fr/product');
        await expect(page).toHaveTitle("Liste des produits");

        await expect(page.getByRole('combobox', {name:'producer-filter'})).toBeEnabled;
       
        await expect(page.getByRole('textbox', {name:'Rechercher'})).toBeEmpty   ;    
        await expect(page.getByRole('textbox', {name:'Rechercher'})).toBeEditable;

        
        await expect(page.getByRole('button', {name:'Ajouter produit'})).toBeVisible;
        await expect(page.getByRole('button', {name:'Ajouter produit'})).toBeEnabled;

    });
    await test.step('Filtrer par producteur', async () => {

        //Selectionner le premier producteur dans la liste
        await page.locator('#producer-filter').selectOption('3');

        await page.locator('#producer-filter').selectOption('3');
        await page.goto('https://dev.ecoglan.fr/product?producer=3');
        await expect(page).toHaveURL('https://dev.ecoglan.fr/product?producer=3');

    
    });
    await test.step('Rechercher un produit', async () => {
        //chercher un produit
       await page.getByRole('textbox', { name: 'Rechercher' }).fill('Fraise');

       await expect(page.getByText('Fraise')).toBeVisible;
       
    });
    await test.step('Modifier un produit', async () => {

        await page.getByRole('textbox', { name: 'Rechercher' }).fill('');
        await page.getByTitle('Éditer le produit').first().click();


        // await page.getByTitle('Editer le produit').nth(1).click();
        // await expect(page).toHaveURL('https://dev.ecoglan.fr/product//edit');
        await expect(page).toHaveTitle('Modifier le produit');

//           await page.getByText('Nom du produit').click();
//   await page.getByLabel('Nom du produit').selectOption('56');
//   await page.getByText('Prix').click();
//   await page.getByRole('textbox', { name: 'Prix*' }).click();
//   await page.getByRole('textbox', { name: 'Prix*' }).fill('1,75');
//   await page.getByText('Description').click();
//   await page.getByRole('textbox', { name: 'Description*' }).click();
//   await page.getByRole('textbox', { name: 'Description*' }).fill('Produit généré automatiquement : Fraise 1');
//   await page.getByRole('button', { name: 'Modifier' }).click();

        await expect(page.getByLabel('Nom du produit' )).toBeVisible;
        await expect(page.getByLabel('Nom du produit' )).toHaveText;
        await expect(page.getByLabel('Nom du produit' )).toBeEditable;

        await expect(page.getByRole('textbox', { name: 'Prix*' })).toBeVisible;
        await expect(page.getByRole('textbox', { name: 'Prix*' })).toHaveText;
        await expect(page.getByRole('textbox', { name: 'Prix*' })).toBeEditable;

        await expect(page.getByRole('textbox', { name: 'Description*' })).toBeVisible;
        await expect(page.getByRole('textbox', { name: 'Description*' })).toHaveText;
        await expect(page.getByRole('textbox', { name: 'Description*' })).toBeEditable;
        
        await expect(page.getByRole('button', { name: 'Modifier' })).toBeVisible;
        await expect(page.getByRole('button', { name: 'Modifier' })).toBeEnabled;
        await expect(page.getByRole('button', { name: 'Modifier' })).toBeVisible;

        await page.getByRole('button', { name: 'Modifier' }).click();
    });
        await test.step('Ajouter un produit', async () => {


            await page.getByRole('link', { name: 'Ajouter produit' }).click();
            await expect(page).toHaveURL('https://dev.ecoglan.fr/product/new?producerId=1') ;
            
            await page.getByLabel('Pour le producteur').selectOption('3');
            await page.getByLabel('Produit du dictionnaire').selectOption('1');
            await page.getByRole('textbox', { name: 'Prix*' }).click();
            await page.getByRole('textbox', { name: 'Prix*' }).fill('1.5');
            await page.getByRole('textbox', { name: 'Description*' }).click();
            await page.getByRole('textbox', { name: 'Description*' }).fill('Test Fred');
            await page.getByRole('button', { name: 'Ajouter' }).click();
        
        });
    await test.step('Supprimer un produit', async () => {
     
        await page.getByTitle('Supprimer le produit').first().click();
        await expect(page.getByText('Suppression')).toBeVisible;

        await expect(page.getByRole('button', { name: 'Annuler' })).toBeEnabled;
        await page.getByRole('button', { name: 'Annuler' }).click();
        await page.getByTitle('Supprimer le produit').first().click();
        await expect(page.getByText('Suppression')).toBeVisible;
        await expect(page.getByRole('button', { name: 'Confirmer' })).toBeEnabled;
        await page.getByRole('button', { name: 'Confirmer' }).click();

    await expect(page.getByText('Suppression')).toBeVisible;
    // await expect(page.getByRole('alert')).toHaveText('Le produit a été supprimé avec succès');
    });


})
