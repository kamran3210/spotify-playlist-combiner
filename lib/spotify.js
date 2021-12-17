import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "playlist-modify-private",
  "playlist-modify-public",
  "playlist-read-collaborative",
].join(",");

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };
