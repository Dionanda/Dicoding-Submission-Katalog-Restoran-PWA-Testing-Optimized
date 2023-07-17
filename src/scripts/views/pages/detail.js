import UrlParser from '../../routes/url-parser';
import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import CONFIG from '../../globals/config';

const Detail = {
  async handleReviewSubmit(event) {
    event.preventDefault();

    const nameInput = document.querySelector('#review-name');
    const reviewInput = document.querySelector('#review-content');
    const reviewId = document.querySelector('#review-id');
    const reviewData = {
      id: reviewId.value,
      name: nameInput.value,
      review: reviewInput.value,
    };

    await Detail.sendReview(reviewData);
    nameInput.value = '';
    reviewInput.value = '';

    const reviewContainer = document.querySelector('.customer-reviews');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date().toLocaleDateString('id-ID', options);
    const newReview = `
    <div class="review-item">
        <div class="review-author">${reviewData.name}</div>
        <div class="review-date">${date}</div>
        <div class="review-text">${reviewData.review}</div>
      </div>
    `;
    reviewContainer.innerHTML += newReview;
  },

  async sendReview(reviewData) {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error('Gagal mengirim ulasan');
      }

      const data = await response.json();
      console.log('Berhasil mengirim ulasan:', data);
    } catch (error) {
      console.error('Gagal mengirim ulasan:', error);
    }
  },

  async render() {
    return `
    <section class="content">
      <div class="explore">
          <h1 class="explore-title" tabindex="0">Detil Restoran</h1>
          <div class="explore-detail" id="list-detail"></div>
          <div id="likeButtonContainer"></div>
      </div>
    </section>
    `;
  },

  async renderRestaurantDetail() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#list-detail');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        description: restaurant.description,
        city: restaurant.city,
        address: restaurant.address,
      },
    });
  },

  async afterRender() {
    await this.renderRestaurantDetail();
    const storeReview = document.querySelector('#add-review__submit');
    storeReview.addEventListener('click', this.handleReviewSubmit);
  },
};

export default Detail;
