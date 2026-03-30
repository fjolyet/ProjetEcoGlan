import { test, expect, Locator } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Test Producteur', async ({ page }) => {



    await page.goto('https://dev.ecoglan.fr/');

    
    await test.step('Connexion Menu Producteurs', async () => {

        
        await page.goto('https://dev.ecoglan.fr/');
        await page.getByRole('link', { name: 'Connexion'}).click();
        await page.getByRole('textbox', { name: 'Identifiant*' }).fill('admin@test.fr');
        await page.getByRole('textbox', { name: 'Mot de passe*' }).fill('@Password2025');
        await page.getByRole('button', { name: 'Connexion'}).click();

        await page.getByRole('link', { name: 'Producteurs', exact :true }).click();

        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/producteur');
        await expect(page).toHaveTitle("Liste des producteurs");

    });
        // Naviguer sur les onglets de la page campagne
    await test.step('Onglets Liste des producteurs', async () => {
        
        await page.getByRole('link', { name: 'Producteurs' }).click();
        
        await page.getByRole('link', { name: 'Vérifiés', exact: true }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/producteur?status=verified');
    
        await page.getByRole('link', { name: 'Non-vérifiés' }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/producteur?status=unverified');

        await page.getByRole('link', { name: 'Désactivés' }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/producteur?status=deleted');


        await page.getByLabel('Filtre des utilisateurs').getByRole('link', { name: 'Adhérents', exact: true }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/producteur?status=adherent');

        
        await page.getByRole('link', { name: 'Non-adhérents' }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/producteur?status=non-adherent');

        
        await page.getByLabel('Filtre des utilisateurs').getByRole('link', { name: 'Référents', exact: true }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/producteur?status=referent');


    });

    await test.step('Rechercher producteur', async () => {

        await page.getByRole('link', { name: 'Tous', exact: true }).click();

        await page.getByRole('searchbox', { name: 'Rechercher' }).fill('Bouffay');
        await page.getByRole('searchbox', { name: 'Rechercher' }).press('Enter');

        await expect(page.getByRole('heading', { name: 'Société'})).toContainText('La Ferme du Bouffay' );

  
    
    });

    await test.step('Voir les produits ', async () => {
        await page.getByTitle('Voir les produits').first().click();
        await expect(page).toHaveTitle("Liste des produits");
        await expect(page).toHaveURL('https://dev.ecoglan.fr/product?producer=22');

    });

    await test.step('Modifier le producteur', async () => {
        await page.goto('https://dev.ecoglan.fr/admin/users/producteur');
        await page.getByTitle("Modifier l'utilisateur").first().click();

        await expect(page).toHaveTitle("Modifier le producteur");
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/producteur/22/edit');        


       await expect(page.getByText('Nom de société', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Nom de société', {exact :true}).first()).toBeEditable();
       await expect(page.getByText('Nom de société', {exact :true}).first()).toContainText;        

       await expect(page.getByText('Prénom', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Prénom', {exact :true}).first()).toBeEditable();
       await expect(page.getByText('Prénom', {exact :true}).first()).toContainText;
       
       await expect(page.getByText('Nom de famille', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Nom de famille', {exact :true}).first()).toBeEditable();
       await expect(page.getByText('Nom de famille', {exact :true}).first()).toContainText;


       await expect(page.getByText('Email', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Email', {exact :true}).first()).toBeEditable();
       await expect(page.getByText('Email', {exact :true}).first()).toContainText;

       
       await expect(page.getByText('Numéro de téléphone', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Numéro de téléphone', {exact :true}).first()).toBeEditable();
       await expect(page.getByText('Numéro de téléphone', {exact :true}).first()).toContainText;



       await expect(page.getByText('Adresse', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Adresse', {exact :true}).first()).toBeEditable();

       await expect(page.getByText('Code postal', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Code postal', {exact :true}).first()).toBeEditable();

       await expect(page.getByText('Ville', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Ville', {exact :true}).first()).toBeEditable();

       await expect(page.getByText('Enregistrer mes informations', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Enregistrer mes informations', {exact :true}).first()).toBeEnabled();

       await page.getByRole('button', { name: 'Enregistrer mes informations' }).click();

       await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/producteur');
       await expect(page.getByText('Utilisateur modifié avec succès !', {exact :true})).toBeVisible();


    });

    await test.step("Désactiver l'utilisateur", async () => {
        await page.goto('https://dev.ecoglan.fr/admin/users/producteur');
         await page.getByRole('button', { name: "Désactiver l'utilisateur" }).first().click();
  

           await expect(page.getByText('Confirmation de désactivation', {exact :true})).toBeVisible();
           await expect(page.getByText('Annuler', {exact :true}).first()).toBeVisible();
           await expect(page.getByText('Confirmer', {exact :true}).first()).toBeVisible();
           await expect(page.getByText('Annuler', {exact :true}).first()).toBeEnabled();
           await expect(page.getByText('Confirmer', {exact :true}).first()).toBeEnabled();
});



})
