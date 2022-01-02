import { atom, selector } from "recoil";
import { difference, intersection, symmetricDifference, union } from "../lib/setOperations";

// Integer to count the current page in the playlist library
export const pageState = atom({
    key: "pageState",
    default: 0
});

// Cache of playlists including tracks, from spotifyApi.getPlaylist, as a dictionary with playlist id's as keys
export const playlistsCacheState = atom({
    key: "playlistsCacheState",
    default: {},
});

// Count of the total number of playlists in the library, used for handling library page logic
export const playlistsTotalState = atom({
    key: "playlistsTotalState",
    default: 0,
});

// Selected playlists, including Id's, playlist names and tracks
export const selectedPlaylistsState = atom({
    key: "selectedPlaylistsState",
    default: [],
});

// The selected action, as an integer, for the set operations
export const selectedActionState = atom({
    key: "selectedActionState",
    default: 0,
});

// The set of tracks that are the selected operation of the selected playlists
export const mergedPlaylistState = selector({
    key: "mergedPlaylistState",
    get: ({get}) => {
        const action = get(selectedActionState);
        const playlists = get(selectedPlaylistsState);

        let trackSets = playlists.map((p) => (
            new Set(p.tracks.items.map((i) => i.track.id))
        ));

        switch (action) {
            case 3:
                return symmetricDifference(trackSets);
            case 2:
                return difference(trackSets);
            case 1:
                return intersection(trackSets);
            default:
                return union(trackSets);
        }
    },
});