export async function getAllSongsInPlaylist(id, spotifyApi) {
    let response;
    try {
        response = await spotifyApi.getPlaylist(id);
    } catch (error) {
        console.log("Error whilst trying to get playlist in getAllSongsInPlaylist!")
        console.log(error)
        return;
    }
    let playlist = response.body

    // If there are more songs left to retrieve
    if (playlist.tracks.total > playlist.tracks.limit) {
        for (let offset = playlist.tracks.limit; offset <= playlist.tracks.total; offset += playlist.tracks.limit) {
            let response2;
            try {
                response2 = await spotifyApi.getPlaylistTracks(id, { limit: playlist.tracks.limit, offset: offset });
            } catch (error) {
                console.log("Error whilst trying to get the next page of songs in getAllSongsInPlaylist!");
                console.log(error)
                return;
            }
            playlist.tracks.items = [...playlist.tracks.items, ...response2.body.items]
        }
        playlist.tracks.limit = playlist.tracks.total;
    }

    return playlist;
}