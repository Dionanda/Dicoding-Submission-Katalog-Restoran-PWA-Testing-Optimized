import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="list-item-detail">
    <div class="restaurant-info">
      <div class="restaurant-image">
        <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
      </div>
      <div class="restaurant-details">
        <h2 class="restaurant-name">${restaurant.name}</h2>
        <div class="restaurant-rating">
          <span class="rating-label">Rating:</span>
          <span class="rating-value">${restaurant.rating}</span>
        </div>
        <div class="restaurant-location">
          <span class="location-label">Kota:</span>
          <span class="location-value">${restaurant.city}</span>
        </div>
        <div class="restaurant-address">${restaurant.address}</div>
        <div class="restaurant-description">${restaurant.description}</div>
      </div>
    </div>
    <div class="menu-section">
      <h2 class="menu-heading">Menu</h2>
      <div class="menu-category">
        <h3 class="category-title">Makanan</h3>
        <ul class="menu-items">
          ${restaurant.menus.foods.map((food) => `<li class="menu-item">${food.name}</li>`).join('')}
        </ul>
      </div>
      <div class="menu-category">
        <h3 class="category-title">Makanan</h3>
        <ul class="menu-items">
          ${restaurant.menus.drinks.map((drink) => `<li class="menu-item">${drink.name}</li>`).join('')}
        </ul>
      </div>
    </div>
    <div class="add-review">
      <h3 class="add-review__title">Berikan Ulasan</h3>
      <a class="add-review__form" id="store-review">
        <div class="add-review__form-group">
          <label for="review-name" class="add-review__label">Nama:</label>
          <input type="text" id="review-name" name="review-name" class="add-review__input" placeholder="Masukkan Nama Anda" required>
          <input type="text" value="${restaurant.id}" name="review-id" id="review-id" hidden>
        </div>
        <div class="add-review__form-group">
          <label for="review-content" class="add-review__label">Review:</label>
          <textarea id="review-content" name="review-content" class="add-review__textarea" placeholder="Tulis Review Anda" required></textarea>
        </div>
        <div class="add-review__form-group">
          <button class="add-review__submit" id="add-review__submit">Kirim Ulasan</button>
        </div>
      </a>
    </div>    
    <div class="customer-reviews">
      <h2 class="reviews-heading">Ulasan Pelanggan</h2>
      ${restaurant.customerReviews.map((customerReview) => `
        <div class="review-item">
          <div class="review-author">${customerReview.name}</div>
          <div class="review-date">${customerReview.date}</div>
          <div class="review-text">${customerReview.review}</div>
        </div>
      `).join('')}
    </div>
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="list-item">
      <img class="list-item-thumb lazyload" data-src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL + restaurant.pictureId : 'https://restaurant-api.dicoding.dev/images/medium/'}" alt="${restaurant.name}" title="${restaurant.name}" tabindex="0">
      <div class="info-city" tabindex="0">${restaurant.city}</div>
      <div class="list-item-content">
          <p class="list-item-rating" tabindex="0">
              Rating : <span class="list-item-rating-value">${restaurant.rating}</span>
          </p>
          <h1 class="list-item-title"><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h1>
          <div class="list-item-desc" tabindex="0">${restaurant.description}...</div>
      </div>
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
