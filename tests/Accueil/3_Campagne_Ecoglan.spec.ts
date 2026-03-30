import { test, expect, Locator } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Test Campagne', async ({ page }) => {



    await page.goto('https://dev.ecoglan.fr/');

    
    await test.step('Connexion Menu Campagne', async () => {

        await page.goto('https://dev.ecoglan.fr/');
        await page.getByRole('link', { name: 'Connexion'}).click();
        await page.getByRole('textbox', { name: 'Identifiant*' }).fill('admin@test.fr');
        await page.getByRole('textbox', { name: 'Mot de passe*' }).fill('@Password2025');
        await page.getByRole('button', { name: 'Connexion'}).click();

        await page.getByRole('link', { name: 'Glanage', exact :true }).click();


        // Naviguer sur les onglets de la page campagne
        await expect(page).toHaveURL('https://dev.ecoglan.fr/campagne');
        await expect(page).toHaveTitle("Liste des campagnes de glanage");

        await expect(page.getByRole('link', { name: 'Tous' })).toBeVisible();
        await page.getByRole('link', { name: 'Tous' }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/campagne?page=1');

        await expect(page.getByRole('link', { name: 'En préparation' })).toBeVisible();
        await page.getByRole('link', { name: 'En préparation' }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/campagne?page=1&status=EN_PR%C3%89PARATION');

        await expect(page.getByRole('link', { name: 'Active' })).toBeVisible();
        await page.getByRole('link', { name: 'Active' }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/campagne?page=1&status=ACTIVE');
        
        await expect(page.getByRole('link', { name: 'Clôturée' })).toBeVisible();
        await page.getByRole('link', { name: 'Clôturée' }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/campagne?page=1&status=CLOTUR%C3%89E');
        
        await expect(page.getByRole('link', { name: 'Annulée' })).toBeVisible();
        await page.getByRole('link', { name: 'Annulée' }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/campagne?page=1&status=ANNUL%C3%89E');

        
        });
  // Cliquer sur le bouton "Ajouter glanage" et vérifier la redirection vers la page de création de campagne
    await test.step('Nouvelle Campagne', async () => {

        await expect(page.getByRole('link', { name: 'Ajouter glanage' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Ajouter glanage' })).toBeEnabled();
        await page.getByRole('link', { name: 'Ajouter glanage' }).click();
        await expect(page).toHaveURL('https://dev.ecoglan.fr/campagne/new');
        await expect(page).toHaveTitle("Nouvelle campagne de glanage");

        await expect(page.getByLabel('Producteur')).toBeEnabled();
        await expect(page.getByLabel('Producteur')).toHaveText(/^Choisissez un producteur/);
        await page.getByLabel('Producteur').selectOption('17');
        
        await expect(page.getByLabel('Produits')).toBeEnabled();
        await expect(page.getByLabel('Produits')).toHaveText(/^— Choisissez un produit —/);
        await page.getByLabel('Produits').selectOption('15');

        await expect(page.getByRole('textbox', { name: 'Début du glanage' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Début du glanage' })).toBeEnabled();
        await page.getByRole('textbox', { name: 'Début du glanage*' }).fill('2026-02-20');
        
        await expect(page.getByRole('textbox', { name: 'Fin du glanage' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Fin du glanage' })).toBeEnabled();
        await page.getByRole('textbox', { name: 'Fin du glanage*' }).fill('2026-02-21');

        
        await expect(page.getByLabel('Référent')).toBeEnabled();
        await expect(page.getByLabel('Référent')).toHaveText(/^— Aucun —/);
        await page.getByLabel('Référent').selectOption('2');
        
        await expect(page.getByRole('textbox', { name: 'Adresse*' })).toBeEnabled();
        await expect(page.getByRole('textbox', { name: 'Adresse*' })).toBeEmpty();
        await page.getByRole('textbox', { name: 'Adresse*' }).fill('rue');

        await expect(page.locator('#map')).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Titre de la campagne*' })).toBeEnabled();
        await expect(page.getByRole('textbox', { name: 'Titre de la campagne*' })).toBeEmpty();
        
      await page.getByRole('textbox', { name: 'Titre de la campagne*' }).fill('TEst Campagne');

        await expect(page.getByRole('textbox', { name: 'Description*' })).toBeEnabled();
        await expect(page.getByRole('textbox', { name: 'Description*' })).toBeEmpty();
       await page.getByRole('textbox', { name: 'Description*' }).fill('TEst Campagne');

    await expect(page.getByRole('button', { name: 'Enregistrer (brouillon)'})).toBeEnabled(); 
    await expect(page.getByRole('button', { name: 'Enregistrer (brouillon)'})).toBeVisible();

    await expect(page.getByRole('button', { name: 'Publier la campagne'})).toBeEnabled();
    await expect(page.getByRole('button', { name: 'Publier la campagne'})).toBeVisible();
  });


})
  