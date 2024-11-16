import axiosInstance from "../index";

export class PokemonService {
  static path = "pokemon";

  static async getAll(page = 1, limit = 10) {
    try {
      const response = await axiosInstance.get(`${this.path}`, {
        params: {
          page,
          limit,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      throw error;
    }
  }
}
