describe('Test of the A LOUER APPARTEMENT ROSAS page', function() {
  before(browser => browser.navigateTo('http://127.0.0.1:9090')); // Change the URL if necessary

  it('Verifica la visibilidad del header y el contenido principal', function(browser) {
    browser
      .waitForElementVisible('body') // Verifies that the body of the page loads
      .assert.visible('header.container-fluid') // Verifies the header
      .assert.containsText('h2.display-3', 'A LOUER APPARTEMENT ROSAS') // Verifies the main title
      .assert.containsText('h2.display-6.text-danger', '2 chambres | 30 m de la plage') // Verifies subtitle
      .assert.visible('a[href="/contact"]') // Verifies the contact button
      .assert.visible('img[alt="spanish"]'); // Verifies that the main image loads
  });

  it('Navigates through the navigation bar and verifies the links', function(browser) {
    browser
      .assert.visible('.navbar-toggler') // Verifies the responsive menu button
      .click('.navbar-toggler') // Opens the menu
      .assert.visible('a[href="/geo"]') // Verifies the "Localisation" link
      .assert.visible('a[href="/pricing"]') // Verifies the "Tarifs" link
      .assert.visible('a[href="/feedback"]') // Verifies the "Avis" link
  });

  it('Verifies the gallery and features section', function(browser) {
    browser
      .assert.visible('#appartement-gallerie') // Gallery of images
      .assert.visible('img[alt="photo1"]') // An example image
      .assert.visible('#caracteristiques') // Verifies the features section
      .assert.containsText('#caracteristiques', 'Plage à 30m') // Verifies feature text
      .assert.containsText('#caracteristiques', 'Parking gratuit'); // Verifies another text
  });

  it('Tests the pricing section', function(browser) {
    browser
      .assert.visible('#tarifs') // Verifies the pricing section
      .assert.containsText('.card-title', 'Basse saison') // Verifies the first card
      .assert.containsText('.card-text', '460 €'); // Verifies the price
  });

  after(browser => browser.end()); // Ends the test
});
