import { useRecoilState, useRecoilValue } from "recoil";
import { pageState, playlistsTotalState } from "../../atoms/playlistsAtom";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

function PageButtons({ perPage }) {

    // Store # of playlists, page number as state
    const playlistsTotal = useRecoilValue(playlistsTotalState);
    const [page, setPage] = useRecoilState(pageState);

    // Check if the next page exists
    function isNextPage() {
        return (page + 1) * perPage < playlistsTotal;
    }
    // Check if the previous page exists
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
