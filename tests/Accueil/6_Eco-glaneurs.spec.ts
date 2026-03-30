import { test, expect, Locator } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Test Eco-Glaneurs', async ({ page }) => {

    
    await test.step('Connexion Menu Eco-Glaneurs', async () => {

        
        await page.goto('https://dev.ecoglan.fr/');
        await page.getByRole('link', { name: 'Connexion'}).click();
        await page.getByRole('textbox', { name: 'Identifiant*' }).fill('admin@test.fr');
        await page.getByRole('textbox', { name: 'Mot de passe*' }).fill('@Password2025');
        await page.getByRole('button', { name: 'Connexion'}).click();

        await page.getByRole('link', { name: 'Eco‑glaneurs' }).click();

        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/gleaner');
        await expect(page).toHaveTitle("Liste des Eco-glaneurs");

    });
        // Naviguer sur les onglets de la page campagne
    await test.step('Onglets Liste des Eco-Glaneurs', async () => {
        
        await page.getByRole('link', { name: 'Tous' }).click();
        
        await page.getByRole('link', { name: 'Vérifiés', exact: true }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/gleaner?status=verified');
    
        await page.getByRole('link', { name: 'Non-vérifiés' }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/gleaner?status=unverified');

        await page.getByRole('link', { name: 'Désactivés' }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/gleaner?status=deleted');

        await page.getByLabel('Filtre des utilisateurs').getByRole('link', { name: 'Adhérents', exact: true }).click();
        // await page.getByRole('link',{ name: 'Adhérents', exact: true }).first().click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/gleaner?status=adherent');

       
        await page.getByRole('link', { name: 'Non-adhérents' }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/gleaner?status=non-adherent');

        
        await page.getByLabel('Filtre des utilisateurs').getByRole('link', { name: 'Référents', exact: true }).click();
        // await page.getByRole('link',{ name: 'Référents', exact: true }).first().click();
        
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/gleaner?status=referent');


    });

    await test.step('Rechercher Eco-Glaneur', async () => {

        await page.getByRole('link', { name: 'Tous', exact: true }).click();

        await page.getByRole('searchbox', { name: 'Rechercher' }).fill('Marchand');
        await page.getByRole('searchbox', { name: 'Rechercher' }).press('Enter');

        // await expect(page).toContainText('Nom : MARCHAND' );
        await expect(page.getByText('Nom : MARCHAND')).toBeVisible();
  
    });

    await test.step('Modifier le producteur', async () => {
        await page.goto('https://dev.ecoglan.fr/admin/users/gleaner');
        await page.getByTitle("Modifier l'utilisateur").first().click();

        await expect(page).toHaveTitle("Modifier l'éco-glaneur");
        await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/gleaner/15/edit');        


       await expect(page.getByText('Prénom', {exact :true}).first()).toBeVisible();
       await expect(page.getByText('Prénom', {exact :true}).first()).toBeEditable();
    // //    await expect(page.getByText('Prénom', {exact :true}).first()).toContainText('Guy'); 
    //    await expect(page.getByRole('textbox', { name: 'Prénom*' })).toContainText('Guy');   
       
       await expect(page.getByPlaceholder('Entrez votre prénom')).toContainText('');
    //    await expect(page.getByText('Nom de famille', {exact :true}).first()).toBeVisible();
    //    await expect(page.getByText('Nom de famille', {exact :true}).first()).toBeEditable();
    //    await expect(page.getByText('Nom de famille', {exact :true}).first()).toContainText('MARCHAND');



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

       await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/gleaner');
       await expect(page.getByText('Utilisateur modifié avec succès !', {exact :true})).toBeVisible();


    });

    await test.step("Désactiver l'utilisateur", async () => {
        await page.goto('https://dev.ecoglan.fr/admin/users/gleaner');
        await page.getByRole('button', { name: "Désactiver l'utilisateur" }).first().click();
  

        await expect(page.getByText('Confirmation de désactivation', {exact :true})).toBeVisible();
        await expect(page.getByText('Êtes-vous sûr de vouloir désactiver cet utilisateur ?', {exact :true})).toBeVisible();
           
           await expect(page.getByText('Annuler', {exact :true}).first()).toBeVisible();
           await expect(page.getByText('Confirmer', {exact :true}).first()).toBeVisible();
           await expect(page.getByText('Annuler', {exact :true}).first()).toBeEnabled();
           await expect(page.getByText('Confirmer', {exact :true}).first()).toBeEnabled();
}); 
    await test.step("Promouvoir l'utilisateur", async () => {
        await page.goto('https://dev.ecoglan.fr/admin/users/gleaner');        
        await page.getByTitle('Promouvoir référent').first().click();
        await expect(page.getByText("Référent attribué à ")).toBeVisible();

}); 
    await test.step("Rétirer le référent", async () => {
        await page.goto('https://dev.ecoglan.fr/admin/users/gleaner');
        await page.getByTitle('Retirer le référent').first().click();
        await expect(page.getByText('Le référent a été retiré avec')).toBeVisible();
});
})