import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedActionState } from "../../atoms/selectedActionAtom";
import { selectedPlaylistsState } from "../../atoms/selectedPlaylistsAtom";
import useSpotify from "../../hooks/useSpotify";
import { difference, intersection, symmetricDifference, union } from "../../lib/setOperations";

function SongCount() {

    const selectedPlaylists = useRecoilValue(selectedPlaylistsState);
    const selectedAction = useRecoilValue(selectedActionState);
    const [songCount, setSongCount] = useState(0);

    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();

    

    useEffect(() => {
        async function getTrackSets() {
            let trackLists = [];
            let response;
            for (let playlist of selectedPlaylists) {
                response = await spotifyApi.getPlaylist(playlist.id);
                trackLists.push(response.body.tracks.items.map((i) => i.track.name));
            }
            let trackSets = trackLists.map((l) => new Set(l));
            let mergedSet;
            if (selectedAction == 0) mergedSet = union(trackSets);
            else if (selectedAction == 1) mergedSet = intersection(trackSets);
            else if (selectedAction == 2) mergedSet = difference(trackSets);
            else mergedSet = symmetricDifference(trackSets);
            console.log(mergedSet);
            setSongCount(mergedSet.size);
        }
        getTrackSets();
    }, [session, spotifyApi, selectedPlaylists, selectedAction]);

    return (
        <p>
            {songCount}
        </p>
    )
}

export default SongCount
