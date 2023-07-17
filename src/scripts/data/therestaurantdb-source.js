import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantDbSource {
  static async listRestaurant() {
    try {
      const response = await fetch(API_ENDPOINT.LIST_RESTAURANT);
      if (!response.ok) {
        throw new Error('Gagal memuat data restaurant');
      }
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      if (!response.ok) {
        throw new Error('Gagal memuat detail restaurant');
      }
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default TheRestaurantDbSource;
