const BASE_URL = 'http://www.hyeumine.com';

export const bingoApi = {
  async getCard(bcode) {
    try {
      const response = await fetch(`${BASE_URL}/getcard.php?bcode=${bcode}`);
      const data = await response.json();

      if (data === 0 || data === '0') {
        throw new Error('Game code not found');
      }

      return data;
    } catch (error) {
      console.error('Error fetching card:', error);
      throw error;
    }
  },

  async checkWin(playcard_token) {
    try {
      const response = await fetch(`${BASE_URL}/checkwin.php?playcard_token=${playcard_token}`);
      const data = await response.text();

      return data === '1';
    } catch (error) {
      console.error('Error checking win:', error);
      throw error;
    }
  }
};
