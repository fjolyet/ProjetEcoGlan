import { test, expect } from '@playwright/test';
// page d'accoueil sans connexion
test('Test accueil - Non connecté', async ({ page }) => {

    await test.step('Liens Page Accueil ', async () => {
// Lien CGU
    await page.goto('https://dev.ecoglan.fr/');
    await page.getByRole('link', { name: 'CGU' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/cgu');
    await expect(page).toHaveTitle("Conditions Générales d'Utilisation");
// Lien glanage
    await page.goto('https://dev.ecoglan.fr/');
    await page.getByRole('link', { name: 'Le glanage ?' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/glanage');
// Lien Confidentialité
    await page.goto('https://dev.ecoglan.fr/');
    await page.getByRole('link', { name: 'Politique de confidentialité' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/confidentialite');
// Nous contacter
    await page.goto('https://dev.ecoglan.fr/');
    await page.getByRole('link', { name: 'Nous contacter' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/contact');
// Devenir adhérent
    await page.goto('https://dev.ecoglan.fr/');
    await page.getByRole('link', { name: 'Devenir adhérent' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/');
//  Lien inscription
    await page.goto('https://dev.ecoglan.fr/');
    await page.getByRole('link', { name: `s'inscrire`}).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/register');
    });

await test.step('Page Connexion ', async () => {
// Page Connexion
    await page.goto('https://dev.ecoglan.fr/');
    await page.getByRole('link', { name: 'Connexion'}).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/login'); 

//  Mot de passe oublié
    await page.getByRole('link', { name: 'Mot de passe oublié ?' }).click();

    await expect(page).toHaveURL('https://dev.ecoglan.fr/reset-password?email=');
    await expect(page).toHaveTitle('Demander une réinitialisation de mot de passe');

    await expect(page.getByRole('textbox', {name: 'email' } )).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'email' } )).toBeEditable();
    await expect(page.getByRole('textbox', {name: 'email' } )).toBeEmpty();

    await expect(page.getByRole('button', {name: 'Envoyer' } )).toBeVisible();
    await expect(page.getByRole('button', {name: 'Envoyer' } )).toBeEnabled();

// Email incorrect
    await page.getByRole('textbox', { name: 'email'}).fill('testnom');
    await page.getByRole('button', {name: 'Envoyer' } ).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/reset-password?email=');
    await expect(page.getByRole('textbox', {name: 'email' } )).toBeEditable();
    await expect(page.getByRole('textbox', {name: 'email' } )).not.toBeEmpty();
    await expect(page.getByRole('textbox', {name: 'email' } )).toHaveAccessibleErrorMessage('');
    await expect(page).toHaveURL('https://dev.ecoglan.fr/reset-password?email=');


// Email correct
    await page.getByRole('textbox', { name: 'email'}).fill('admin@test.fr');
    await page.getByRole('button', {name: 'Envoyer' } ).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/reset-password/check-email');
    await expect(page).toHaveTitle("Email pour la réinitialisation du mot de passe");
    await expect(page.getByRole('link', {name: 'réessayez'})).toBeEnabled();

// Bouton reesayer
    await page.getByRole('link', {name: 'réessayez'}).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/reset-password');
    await expect(page).toHaveTitle("Demander une réinitialisation de mot de passe");


    
});

});
test('Test accueil - Admin', async ({ page }) => {

// Connexion Profil Admin
    await page.goto('https://dev.ecoglan.fr/');
    await page.getByRole('link', { name: 'Connexion'}).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/login');
    await page.getByRole('textbox', { name: 'Identifiant*' }).fill('admin@test.fr');
    await page.getByRole('textbox', { name: 'Mot de passe*' }).fill('@Password2025');
    await page.getByRole('button', { name: 'Connexion'}).click();

    await page.getByRole('link', { name: 'CGU' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/cgu');
    await expect(page).toHaveTitle("Conditions Générales d'Utilisation");

    await page.getByRole('link', { name: 'Le glanage ?' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/glanage');

    await page.getByRole('link', { name: 'Politique de confidentialité' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/confidentialite');

    await page.getByRole('link', { name: 'Nous contacter' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/contact');
    
    await page.locator('.btn').first().click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/mon-profil');

    await page.getByRole('link', { name: 'Tableau de bord', exact: true }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/dashboard');

    await page.getByRole('link', { name: 'Glanage', exact: true }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/campagne');
    
    await page.getByRole('link', { name: 'Produits', exact: true }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/product');
    
    await page.getByRole('link', { name: 'Producteurs' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/producteur');

    await page.getByRole('link', { name: /Eco.?glaneur/i }).first().click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/gleaner');
    
    await page.locator('#main-navbar').getByRole('link', { name: 'Référents' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/referent');

    await page.getByRole('link', { name: 'Administrateurs', exact: true}).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/users/admin');

    await page.getByRole('link', { name: 'Adhérents' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/admin/adherents');

    await page.getByRole('link', { name: 'Dictionnaire de produits' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/product/dictionary/');

// await test.step'Déconnexion profil Admin', async () => {
    await page.locator('li:nth-child(3) > .btn').click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/login');

});

test('Test accueil - Profil Producteur', async ({ page }) => {

await test.step('Connexion comme producteur', async () => {

    await page.goto('https://dev.ecoglan.fr/');
    await page.getByRole('link', { name: 'Connexion'}).click();
    await page.getByRole('textbox', { name: 'Identifiant*' }).fill('producteur@test.fr');
    await page.getByRole('textbox', { name: 'Mot de passe*' }).fill('@Password2025');
    await page.getByRole('button', { name: 'Connexion'}).click();
});
await test.step('Menus Spécifiques pour producteur', async () => {
    
    await page.getByRole('link', { name: 'CGU' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/cgu');
    await expect(page).toHaveTitle("Conditions Générales d'Utilisation");

    await page.getByRole('link', { name: 'Le glanage ?' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/glanage');

    await page.getByRole('link', { name: 'Politique de confidentialité' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/confidentialite');

    await page.getByRole('link', { name: 'Nous contacter' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/contact'); 

    await page.getByRole('link', { name: 'Tableau de bord' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/dashboard');

    await page.getByRole('link', { name: 'Glanage', exact: true }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/campagne');
    
    await page.getByRole('link', { name: 'Produits', exact: true }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/product');


});
await test.step('Déconnexion profil Producteur', async () => {
  await page.locator('li:nth-child(3) > .btn').click();
      await expect(page).toHaveURL('https://dev.ecoglan.fr/login');
});
});

test('Test accueil - Profil Glaneur', async ({ page }) => {

//   await test.step('Navigating to URL', async () => {

await test.step('Connexion comme producteur', async () => {

    await page.goto('https://dev.ecoglan.fr/');
    await page.getByRole('link', { name: 'Connexion'}).click();
    await page.getByRole('textbox', { name: 'Identifiant*' }).fill('glaneur@test.fr');
    await page.getByRole('textbox', { name: 'Mot de passe*' }).fill('@Password2025');
    await page.getByRole('button', { name: 'Connexion'}).click();
});

await test.step('Menu Spécifiques pour Glaneur', async () => {

     await page.getByRole('link', { name: 'CGU' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/cgu');
    await expect(page).toHaveTitle("Conditions Générales d'Utilisation");

    await page.getByRole('link', { name: 'Le glanage ?' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/glanage');

    await page.getByRole('link', { name: 'Politique de confidentialité' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/confidentialite');

    await page.getByRole('link', { name: 'Nous contacter' }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/contact');
    
    await page.getByRole('link', { name: 'Tableau de bord', exact: true }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/dashboard');

    await page.getByRole('link', { name: 'Glanage', exact: true }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/campagne');
    
    await page.getByRole('link', { name: 'Produits', exact: true }).click();
    await expect(page).toHaveURL('https://dev.ecoglan.fr/product');

});

// await test.step('Déconnexion profil Glaneur', async () => {
//   await page.locator('li:nth-child(3) > .btn').click();
//       await expect(page).toHaveURL('https://dev.ecoglan.fr/login');
// });    
})
