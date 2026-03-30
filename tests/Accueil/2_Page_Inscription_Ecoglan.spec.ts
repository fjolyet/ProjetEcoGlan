import { test, expect } from '@playwright/test';
import { ReadableStreamDefaultController } from 'stream/web';

/**
 * Author Frederic JOLYET SII
 */
test('Test Inscription', async ({ page }) => {


// Page inscription
await page.goto('https://dev.ecoglan.fr/');

await page.getByRole('link', { name: `s'inscrire`}).click();
await expect(page).toHaveURL('https://dev.ecoglan.fr/register');


await test.step('Formulaire Glaneur', async () => {
    
    await expect(page.getByRole('heading', { name: 'Inscription' })).toBeVisible();

    await expect(page.getByRole('radio', { name: 'Un Glaneur' })).toBeVisible();

    await expect(page.getByRole('radio', { name: 'Un Producteur' })).toBeVisible();

    // Cocher le bouton Glaneur
    await page.getByRole('radio', { name: 'Un Glaneur' }).check();

    // Le champ société ne doit pas être visible pour le glaneur
     await expect(page.getByPlaceholder('Nom de société')).toBeHidden();

    // Les champs suivants doivent être visibles, vides et saisissables pour le glaneur
        
    await expect(page.getByRole('textbox' , { name: 'Nom*' , exact: true }).first()).toBeVisible();
    await expect(page.getByRole('textbox' , { name: 'Nom*' , exact: true }).first()).toBeEditable();
    await expect(page.getByRole('textbox' , { name: 'Nom*' , exact: true }).first()).toBeEmpty();
     
    await expect(page.getByRole('textbox', {name: 'Prénom*' } )).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Prénom*' } )).toBeEditable();
    await expect(page.getByRole('textbox', {name: 'Prénom*' } )).toBeEmpty();
    
    await expect(page.getByRole('textbox', { name: 'Email*' })).toBeVisible(); 
    await expect(page.getByRole('textbox', { name: 'Email*' })).toBeEditable(); 
    await expect(page.getByRole('textbox', { name: 'Email*' })).toBeEmpty(); 
    
    await expect(page.getByRole('textbox', { name: 'Numéro de téléphone*' })).toBeVisible(); 
    await expect(page.getByRole('textbox', { name: 'Numéro de téléphone*' })).toBeEditable(); 
    await expect(page.getByRole('textbox', { name: 'Numéro de téléphone*' })).toBeEmpty(); 
    
    await expect(page.getByRole('textbox', { name: 'Mot de passe*' }).first()).toBeVisible(); 
    await expect(page.getByRole('textbox', { name: 'Mot de passe*' }).first()).toBeEditable(); 
    await expect(page.getByRole('textbox', { name: 'Mot de passe*' }).first()).toBeEmpty(); 
    
    await expect(page.getByRole('textbox', { name: 'Confirmation du mot de passe*' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Confirmation du mot de passe*' })).toBeEditable();
    await expect(page.getByRole('textbox', { name: 'Confirmation du mot de passe*' })).toBeEmpty();
    
    await expect(page.getByRole('textbox', { name: 'Entrez votre adresse' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Entrez votre adresse' })).toBeEditable();
    await expect(page.getByRole('textbox', { name: 'Entrez votre adresse' })).toBeEmpty();
    
    await expect(page.getByRole('textbox', { name: 'Adresse', exact :true})).toBeVisible(); 
    await expect(page.getByRole('textbox', { name: 'Adresse', exact :true})).toBeEditable(); 
    await expect(page.getByRole('textbox', { name: 'Adresse', exact :true})).toBeEmpty(); 
    
    await expect(page.getByRole('textbox', { name: 'Code postal' })).toBeVisible(); 
    await expect(page.getByRole('textbox', { name: 'Code postal' })).toBeEditable(); 
    await expect(page.getByRole('textbox', { name: 'Code postal' })).toBeEmpty(); 

    await expect(page.getByRole('textbox', { name: 'Ville' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Ville' })).toBeEditable();
    await expect(page.getByRole('textbox', { name: 'Ville' })).toBeEmpty();

    // Case à cocher pour accepter les conditions d'utilisation, décochée par défaut

    await expect(page.getByRole('checkbox', { name: "J'accepte les conditions d'utilisation*" })).toBeVisible();
    await expect(page.getByRole('checkbox', { name: "J'accepte les conditions d'utilisation*" })).toBeEnabled();
    await expect(page.getByRole('checkbox', { name: "J'accepte les conditions d'utilisation*" })).not.toBeChecked();   

    // Bouton enregistrer
    await expect(page.getByRole('button', { name: 'Enregistrer' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Enregistrer' })).toBeEnabled();

});


await test.step('Inscription Glaneur ', async () => {
 
    // Cocher le bouton Glaneur
    await page.getByRole('radio', { name: 'Un Glaneur' }).check();
   
    // Renseigner les champs du formulaire Glaneur
    await page.getByRole('textbox', { name: 'Nom*', exact: true }).fill('testnom');
    await page.getByRole('textbox', { name: 'Prénom*' }).fill('testprenom');
    await page.getByRole('textbox', { name: 'Email*' }).fill('test@fr');
    await page.getByRole('textbox', { name: 'Numéro de téléphone*' }).fill('0607080910');
    await page.getByRole('textbox', { name: 'Mot de passe*', exact: true }).fill('@test012025');
    await page.getByRole('textbox', { name: 'Confirmation du mot de passe*' }).fill('@test012025');
    
    await page.getByRole('textbox', { name: 'Entrez votre adresse' }).fill('@test012025');
    await page.getByRole('textbox', { name: 'Adresse', exact: true}).fill('@test012025');
    await page.getByRole('textbox', { name: 'Code Postal' }).fill('@test012025');
    await page.getByRole('textbox', { name: 'Ville' }).fill('@test012025'); 
    
    // Cocher la case "J'accepte les conditions d'utilisation*"
    await page.getByRole('checkbox', { name: "J'accepte les conditions d'utilisation*" }).check(); 
      
    await page.getByRole('button', { name: 'Enregistrer' }).click();

    await expect(page).toHaveURL('https://dev.ecoglan.fr/register');
      
//   await expect(page.getByText('Veuillez cocher cette case si vous souhaitez continuer')).toBeVisible();
    //   await expect(page.getByRole('checkbox', { name: "J'accepte les conditions d'utilisation*" })).toHaveAccessibleErrorMessage('Veuillez cocher cette case si vous souhaitez continuer');

//   await expect(page.getByText ('Veuillez cocher cette case si vous souhaitez continuer')).toHaveAccessibleErrorMessage
});

await test.step('Formulaire Producteur', async () => {
    await page.goto('https://dev.ecoglan.fr/register');

    await expect(page.getByRole('heading', { name: 'Inscription' })).toBeVisible();

    await expect(page.getByRole('radio', { name: 'Un Glaneur' })).toBeVisible();

    await expect(page.getByRole('radio', { name: 'Un Producteur' })).toBeVisible();

    // Cocher le bouton Producteur
    await page.getByRole('radio', { name: 'Un Producteur' }).check();

    // Tout les champ doivent être visible pour le producteur

    await expect(page.getByRole('textbox', {name: 'Nom de société' } )).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Nom de société' } )).toBeEditable();
    await expect(page.getByRole('textbox', {name: 'Nom de société' } )).toBeEmpty();
        
    await expect(page.getByRole('textbox' , { name: 'Nom*' , exact: true }).first()).toBeVisible();
    await expect(page.getByRole('textbox' , { name: 'Nom*' , exact: true }).first()).toBeEditable();
    await expect(page.getByRole('textbox' , { name: 'Nom*' , exact: true }).first()).toBeEmpty();
     
    await expect(page.getByRole('textbox', {name: 'Prénom*' } )).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Prénom*' } )).toBeEditable();
    await expect(page.getByRole('textbox', {name: 'Prénom*' } )).toBeEmpty();
    
    await expect(page.getByRole('textbox', { name: 'Email*' })).toBeVisible(); 
    await expect(page.getByRole('textbox', { name: 'Email*' })).toBeEditable(); 
    await expect(page.getByRole('textbox', { name: 'Email*' })).toBeEmpty(); 
    
    await expect(page.getByRole('textbox', { name: 'Numéro de téléphone*' })).toBeVisible(); 
    await expect(page.getByRole('textbox', { name: 'Numéro de téléphone*' })).toBeEditable(); 
    await expect(page.getByRole('textbox', { name: 'Numéro de téléphone*' })).toBeEmpty(); 
    
    await expect(page.getByRole('textbox', { name: 'Mot de passe*' }).first()).toBeVisible(); 
    await expect(page.getByRole('textbox', { name: 'Mot de passe*' }).first()).toBeEditable(); 
    await expect(page.getByRole('textbox', { name: 'Mot de passe*' }).first()).toBeEmpty(); 
    
    await expect(page.getByRole('textbox', { name: 'Confirmation du mot de passe*' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Confirmation du mot de passe*' })).toBeEditable();
    await expect(page.getByRole('textbox', { name: 'Confirmation du mot de passe*' })).toBeEmpty();
    
    await expect(page.getByRole('textbox', { name: 'Entrez votre adresse' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Entrez votre adresse' })).toBeEditable();
    await expect(page.getByRole('textbox', { name: 'Entrez votre adresse' })).toBeEmpty();
    
    await expect(page.getByRole('textbox', { name: 'Adresse', exact :true})).toBeVisible(); 
    await expect(page.getByRole('textbox', { name: 'Adresse', exact :true})).toBeEditable(); 
    await expect(page.getByRole('textbox', { name: 'Adresse', exact :true})).toBeEmpty(); 
    
    await expect(page.getByRole('textbox', { name: 'Code postal' })).toBeVisible(); 
    await expect(page.getByRole('textbox', { name: 'Code postal' })).toBeEditable(); 
    await expect(page.getByRole('textbox', { name: 'Code postal' })).toBeEmpty(); 

    await expect(page.getByRole('textbox', { name: 'Ville' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Ville' })).toBeEditable();
    await expect(page.getByRole('textbox', { name: 'Ville' })).toBeEmpty();

    // Case à cocher pour accepter les conditions d'utilisation, décochée par défaut

    await expect(page.getByRole('checkbox', { name: "J'accepte les conditions d'utilisation*" })).toBeVisible();
    await expect(page.getByRole('checkbox', { name: "J'accepte les conditions d'utilisation*" })).toBeEnabled();
    await expect(page.getByRole('checkbox', { name: "J'accepte les conditions d'utilisation*" })).not.toBeChecked();   

    await expect(page.getByRole('button', { name: 'Enregistrer' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Enregistrer' })).toBeEnabled();
    });

await test.step('Formulaire Producteur', async () => {
    
    // Cocher la case producteur    
    await page.getByRole('radio', { name: 'Un Producteur' }).check();

    // Renseigner les champs du formulaire Producteur

    
    await page.getByRole('textbox', { name: 'Nom de société' }).fill('Test Ferme');
     await page.getByRole('textbox', { name: 'Nom*', exact: true }).fill('testnom');
    await page.getByRole('textbox', { name: 'Prénom*' }).fill('testprenom');
    await page.getByRole('textbox', { name: 'Email*' }).fill('test@fr');
    await page.getByRole('textbox', { name: 'Numéro de téléphone*' }).fill('0607080910');
    await page.getByRole('textbox', { name: 'Mot de passe*', exact: true }).fill('@test012025');
    await page.getByRole('textbox', { name: 'Confirmation du mot de passe*' }).fill('@test012025');

    await page.getByRole('textbox', { name: 'Entrez votre adresse' }).fill('@test012025');
    await page.getByRole('textbox', { name: 'Adresse', exact: true }).fill('@test012025');
    await page.getByRole('textbox', { name: 'Code Postal' }).fill('@test012025');
    await page.getByRole('textbox', { name: 'Ville' }).fill('@test012025');

    await page.getByRole('button', { name: 'Enregistrer' }).click();

    await page.getByRole('checkbox', { name: "J'accepte les conditions d'utilisation*" }).check(); 
      
    await page.getByRole('button', { name: 'Enregistrer' }).click();

    await expect(page).toHaveURL('https://dev.ecoglan.fr/register');
});
})
