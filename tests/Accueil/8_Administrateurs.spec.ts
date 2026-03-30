import { test, expect, Locator } from '@playwright/test';

/**
 * Author Fred JOLYET SII
 */
test('Test Onglet Administrateurs', async ({ page }) => {

    
    await test.step('Connexion Menu Administrateurs', async () => {

        
        await page.goto('https://dev.ecoglan.fr/');
        await page.getByRole('link', { name: 'Connexion'}).click();
        await page.getByRole('textbox', { name: 'Identifiant*' }).fill('admin@test.fr');
        await page.getByRole('textbox', { name: 'Mot de passe*' }).fill('@Password2025');
        await page.getByRole('button', { name: 'Connexion'}).click();

        await page.getByRole('link', { name: 'Administrateurs' }).click();

        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/admin');
        await expect(page).toHaveTitle("Liste des Administrateurs");

    });
        // Naviguer sur les onglets de la page Administrateurs
    await test.step('Onglets Liste des Administrateurs', async () => {
        
        await page.getByRole('link', { name: 'Tous' }).click();

        await page.getByRole('link', { name: 'Désactivés' }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/admin?status=deleted');


    });

    await test.step('Rechercher Administrateur', async () => {

        await page.getByRole('link', { name: 'Tous', exact: true }).click();

        await page.getByRole('searchbox', { name: 'Rechercher' }).fill('WILLIS');
        await page.getByRole('searchbox', { name: 'Rechercher' }).press('Enter');

        await expect(page.getByText('Nom : WILLIS')).toBeVisible();
    });

    await test.step('Modifier Administrateur', async () => {
        await page.goto('https://dev.ecoglan.fr/admin/users/admin');
        await page.getByTitle("Modifier l'utilisateur").first().click();

        await expect(page).toHaveTitle("Modifier l'administrateur");
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/admin/8/edit');        


       await expect(page.getByText('Prénom', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Prénom', {exact :true}).first()).toBeEditable();
       
       await expect(page.getByText('Nom de famille', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Nom de famille', {exact :true}).first()).toBeEditable();

       await expect(page.getByText('Email', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Email', {exact :true}).first()).toBeEditable();
       
       await expect(page.getByText('Numéro de téléphone', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Numéro de téléphone', {exact :true}).first()).toBeEditable();

       await expect(page.getByText('Adresse', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Adresse', {exact :true}).first()).toBeEditable();

       await expect(page.getByText('Code postal', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Code postal', {exact :true}).first()).toBeEditable();

       await expect(page.getByText('Ville', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Ville', {exact :true}).first()).toBeEditable();

       await expect(page.getByText('Enregistrer mes informations', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Enregistrer mes informations', {exact :true}).first()).toBeEnabled();

       await page.getByRole('button', { name: 'Enregistrer mes informations' }).click();

       await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/admin');
       await expect(page.getByText('Utilisateur modifié avec succès !', {exact :true})).toBeVisible();


    });

    await test.step("Désactiver l'utilisateur", async () => {
        await page.goto('https://dev.ecoglan.fr/admin/users/admin');
        await page.getByRole('button', { name: "Désactiver l'utilisateur" }).first().click();
  

        await expect(page.getByText('Confirmation de désactivation', {exact :true})).toBeVisible();
        await expect(page.getByText('Êtes-vous sûr de vouloir désactiver cet utilisateur ?', {exact :true})).toBeVisible();
           
           await expect(page.getByText('Annuler', {exact :true}).first()).toBeVisible();
           await expect(page.getByText('Confirmer', {exact :true}).first()).toBeVisible();
           await expect(page.getByText('Annuler', {exact :true}).first()).toBeEnabled();
           await expect(page.getByText('Confirmer', {exact :true}).first()).toBeEnabled();
}); 


    await test.step("Promouvoir l'utilisateur", async () => {
        await page.goto('https://dev.ecoglan.fr/admin/users/admin');        

        await page.getByTitle('Promouvoir référent').first().click();
        await expect(page.getByText("Référent attribué à ")).toBeVisible();
    });
    await test.step("Retirer le référent", async () => {
        await page.goto('https://dev.ecoglan.fr/admin/users/admin');
        await page.getByTitle('Retirer le référent').first().click();
        await expect(page.getByText('Le référent a été retiré avec')).toBeVisible();
});
})