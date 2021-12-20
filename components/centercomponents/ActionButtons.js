import { useRecoilState } from "recoil";
import { pageState } from "../../atoms/pageAtom";
import { playlistsTotalState } from "../../atoms/playlistsTotalAtom";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

function ActionButtons() {
    // Amount of playlists to display per page
    const perPage = 10;

    // Store playlists, # of playlists, page number as state
    const [playlistsTotal, setPlaylistsTotal] = useRecoilState(playlistsTotalState);
    const [page, setPage] = useRecoilState(pageState);

    function isNextPage() {
        return (page + 1) * perPage < playlistsTotal;
    }

    function isPrevPage() {
        return page > 0;
    }

    return (
        <div className="flex bg-gray-800 rounded-lg shadow-lg h-10">
            {/* Union */}
            <div className="px-3 flex items-center justify-center
                            hover:bg-blue-600 hover:text-blue-200 cursor-pointer ">
                <p>Union</p>
            </div>
            {/* Intersection */}
            <div className="px-3 flex items-center justify-center
                            hover:bg-blue-600 hover:text-blue-200 cursor-pointer ">
                <p>Intersection</p>
            </div>
            {/* Difference */}
            <div className="px-3 flex items-center justify-center
                            hover:bg-blue-600 hover:text-blue-200 cursor-pointer ">
                <p>Difference</p>
            </div>
            {/* Symmetric Difference */}
            <div className="px-3 flex items-center justify-center
                            hover:bg-blue-600 hover:text-blue-200 cursor-pointer ">
                <p>Symmetric Difference</p>
            </div>
        </div>
    )
}

export default ActionButtons
