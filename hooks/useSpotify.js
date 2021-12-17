import { useSession } from "next-auth/react"

function useSpotify() {
  const { data: session, status } = useSession();
  
  return (
    <div>

    </div>
  )
}

export default useSpotify
