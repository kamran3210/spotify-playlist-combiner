import { useRecoilState } from "recoil";
import { pageState } from "../../atoms/pageAtom";
import { playlistsTotalState } from "../../atoms/playlistsTotalAtom";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

function PageButtons() {
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
        <div className="flex bg-gray-800 rounded-lg shadow-lg">
            {/* Left arrow */}
            <div className={"w-10 ".concat(isPrevPage() ? "hover:bg-blue-600 hover:text-blue-200" : "bg-gray-600")}>
                <button className="p-1" onClick={() => setPage(page-1)} disabled={!isPrevPage()}>
                    <ChevronLeftIcon className="w-full h-full"/>
                </button>
            </div>
            {/* Page number */}
            <div className="px-3 flex items-center justify-center">
                <p>{page+1}</p>
            </div>
            {/* Right arrow */}
            <div className={"w-10 ".concat(isNextPage() ? "hover:bg-blue-600 hover:text-blue-200" : "bg-gray-600")}>
                <button className="p-1" onClick={() => setPage(page+1)} disabled={!isNextPage()}>
                    <ChevronRightIcon className="w-full h-full"/>
                </button>
            </div>
        </div>
    )
}

export default PageButtons
