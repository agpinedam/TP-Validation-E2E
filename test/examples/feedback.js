describe('FeedBack Page Tests', function() {
  before(browser => browser.navigateTo('http://127.0.0.1:9090/feedback')); // Change port or URL if needed

  it('Verify visibility of received feedbacks', function(browser) {
    browser
      .waitForElementVisible('.row > .col-12', 5000, 'Feedbacks are visible')
      .assert.containsText('.card-body blockquote p', 'This is a test message.', 'The feedback message is visible');
  });

  it('Verify visibility of the feedback form', function(browser) {
    browser
      .waitForElementVisible('main.container', 5000)
      .assert.visible('form', 'The feedback form is visible')
      .assert.visible('input[name="name"]', 'The name field is visible')
      .assert.visible('textarea[name="message"]', 'The message field is visible')
      .assert.visible('button[type="submit"]', 'The submit button is visible');
  });

  it('Verify submission of the feedback form', function(browser) {
    browser
      .waitForElementVisible('form', 5000)
      .setValue('input[name="name"]', 'John Doe')
      .setValue('textarea[name="message"]', 'This is a test message.')
      .moveToElement('button[type="submit"]', 0, 0)  // Move to submit button to make it visible
      .execute(function() {
        document.querySelector('button[type="submit"]').scrollIntoView({behavior: 'auto'});
      })
      .click('button[type="submit"]')
      .waitForElementVisible('.card', 5000, 'After submission, a new feedback appears')
      .pause(1000)
      .assert.urlContains('/feedback')
      .assert.value('input[name="name"]', '')
      .assert.value('textarea[name="message"]', '')
      .end();
  });

  after(browser => browser.end()); // End the browser
});
