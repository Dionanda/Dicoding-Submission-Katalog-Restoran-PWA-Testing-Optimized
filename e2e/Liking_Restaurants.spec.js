const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/');
});

Scenario('Liking a restaurant', async ({ I }) => {
  I.wait(2);

  I.waitForElement('.list-item-title a');

  const firstRestaurant = locate('.list-item-title a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);

  I.click(firstRestaurant);

  I.wait(2);

  I.waitForElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  I.wait(2);

  I.waitForElement('.list-item-title');

  const likedRestaurantName = await I.grabTextFrom('.list-item-title a');

  assert.strictEqual(likedRestaurantName, firstRestaurantName);
});

Scenario('Unliking a restaurant', async ({ I }) => {
  I.wait(2);

  I.waitForElement('.list-item-title a');

  const firstRestaurant = locate('.list-item-title a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);

  I.click(firstRestaurant);

  I.wait(2);

  I.waitForElement('#likeButton');
  I.click('#likeButton');

  I.wait(2);

  I.amOnPage('/#/favorite');

  I.wait(2);

  I.waitForElement('.list-item-title');

  const likedRestaurantName = await I.grabTextFrom('.list-item-title a');

  assert.strictEqual(likedRestaurantName, firstRestaurantName);

  I.click('.list-item-title a');

  I.wait(2);

  I.waitForElement('#likeButton');
  I.click('#likeButton');

  I.wait(2);

  I.amOnPage('/#/favorite');

  I.wait(2);

  I.dontSeeElement('.list-item-title');
});

Scenario('Customer review', async ({ I }) => {
  I.wait(2);

  I.waitForElement('.list-item-title a');

  const firstRestaurant = locate('.list-item-title a').first();

  I.click(firstRestaurant);

  I.seeElement('.add-review__form');

  const textReview = 'I just did the e2e test experiment';
  I.fillField('review-name', 'Person 1');
  I.fillField('review-content', textReview);

  I.click('#add-review__submit');

  const lastReview = locate('.review-text').last();
  const textLastReview = await I.grabTextFrom(lastReview);

  assert.strictEqual(textReview, textLastReview);
});
