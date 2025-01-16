# Hello World

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install helloworld.

Use node v16 use :
```bash
nvm install 16
```

```bash
npm i
```

## Usage

Start the application dev with :

```bash
npm run start
```

Created the dist with :

```bash
npm run dist
```

Analyse the coding rules with :

```bash
npm run lint
```

# Test de la page A LOUER APPARTEMENT ROSAS

## Introduction
Ce README fournit une description détaillée des tests réalisés sur la page **A LOUER APPARTEMENT ROSAS**.

## Table des matières
- [Vue d'ensemble](#overview)
- [Tests Automatisés](#automated-tests)
  - [Test de visibilité du header et du contenu principal](#test-header-main-content)
  - [Navigation dans la barre de navigation et vérification des liens](#test-navigation-links)
  - [Galerie et section de caractéristiques](#test-gallery-features)
  - [Section de prix](#test-pricing-section)
- [Cas de Test - Scénarios](#test-scenarios)
  - [Scénario 1 : Réaliser une authentification validée](#scenario1-authentication-success)
  - [Scénario 2 : Réaliser une authentification non valide](#scenario2-authentication-failure)

---

## Vue d'ensemble
Ce fichier contient les scripts de test automatisés pour la page **A LOUER APPARTEMENT ROSAS**. Les tests assurent que l'interface utilisateur est accessible et fonctionne correctement.

---

## Tests Automatisés

### Test de visibilité du header et du contenu principal
Ce test vérifie que l'en-tête et le contenu principal s'affichent correctement.

```javascript
describe('Test of the A LOUER APPARTEMENT ROSAS page', function() {
  before(browser => browser.navigateTo('http://127.0.0.1:9090')); // Changez l'URL si nécessaire

  it('Vérifie la visibilité du header et du contenu principal', function(browser) {
    browser
      .waitForElementVisible('body') // Vérifie que le corps de la page charge
      .assert.visible('header.container-fluid') // Vérifie l'en-tête
      .assert.containsText('h2.display-3', 'A LOUER APPARTEMENT ROSAS') // Vérifie le titre principal
      .assert.containsText('h2.display-6.text-danger', '2 chambres | 30 m de la plage') // Vérifie sous-titre
      .assert.visible('a[href="/contact"]') // Vérifie le bouton de contact
      .assert.visible('img[alt="spanish"]'); // Vérifie que l'image principale se charge
  });
});

