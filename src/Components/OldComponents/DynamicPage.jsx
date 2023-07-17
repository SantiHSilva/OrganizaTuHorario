import { useParams } from "react-router-dom";

export default function DynamicPage(){
    const { id } = useParams();
    console.log()
    // window.location.href = `https://twitch.tv/${id}`
    return(null)
}