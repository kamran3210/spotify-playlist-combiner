import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { mergedPlaylistState } from "../../atoms/playlistsAtom";

function SongCount() {

    const mergedSet = useRecoilValue(mergedPlaylistState);
    
    console.log(mergedSet)

    return (
        <>
            {mergedSet.size}
        </>
    )
}

export default SongCount
