import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <section class="content">
      <div class="explore">
          <h1 class="explore-title" tabindex="0">Jelajahi Restoran</h1>
          <div class="explore-list" id="list"></div>
      </div>
    </section>
      `;
  },

  async afterRender() {
    const restaurants = await TheRestaurantDbSource.listRestaurant();
    const restaurantsContainer = document.querySelector('#list');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
