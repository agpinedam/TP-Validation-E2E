describe('Test de la page A LOUER APPARTEMENT ROSAS', function() {
  before(browser => browser.navigateTo('http://127.0.0.1:9090')); // Changez l'URL si nécessaire

  it('Vérifie la visibilité de l’en-tête et du contenu principal', function(browser) {
    browser
      .windowMaximize()
      .waitForElementVisible('body') // Vérifie que le corps de la page est chargé
      .assert.visible('header.container-fluid') // Vérifie l’en-tête
      .assert.containsText('h2.display-3', 'A LOUER APPARTEMENT ROSAS') // Vérifie le titre principal
      .assert.containsText('h2.display-6.text-danger', '2 chambres | 30 m de la plage') // Vérifie le sous-titre
      .assert.visible('a[href="/contact"]') // Vérifie le bouton de contact
      .assert.visible('img[alt="spanish"]'); // Vérifie que l’image principale est chargée
  });

  it('Navigue dans la barre de navigation et vérifie les liens', function(browser) {
    browser
      .assert.visible('a[href="/geo"]') // Vérifie le lien "Localisation"
      .assert.visible('a[href="/pricing"]') // Vérifie le lien "Tarifs"
      .assert.visible('a[href="/feedback"]'); // Vérifie le lien "Avis"
  });

  it('Vérifie la section galerie et caractéristiques', function(browser) {
    browser
      .windowMaximize()
      .assert.visible('#appartement-gallerie') // Galerie d'images
      .assert.visible('img[alt="photo1"]') // Une image d'exemple
      .assert.visible('#caracteristiques') // Vérifie la section des caractéristiques
      .assert.containsText('#caracteristiques', 'Plage à 30m') // Vérifie un texte de caractéristiques
      .assert.containsText('#caracteristiques', 'Parking gratuit'); // Vérifie un autre texte
  });

  it('Teste la section tarifs avec XPath', function (browser) {
    browser
      .windowMaximize()
      .assert.visible('#tarifs') // Vérifie que la section tarifs est visible
      .useXpath() // Change le mode en XPath
      .assert.visible('//*[@id="tarifs"]/div[2]/div[3]/div') // Vérifie que l’élément cible est visible
      .execute(function () {
        const element = document.evaluate(
          '//*[@id="tarifs"]/div[2]/div[3]/div',
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
  
        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        }
      })
      .pause(500) // Attend pour s'assurer que le défilement est terminé
      .assert.containsText('//*[@id="tarifs"]/div[2]/div[3]/div', 'Haute saison') // Vérifie le texte de l'élément
      .useCss(); // Retourne au mode CSS si nécessaire
  });  

  after(browser => browser.end()); // Termine le test
});
