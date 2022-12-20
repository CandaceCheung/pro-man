import { useEffect } from "react";
import ProjectNavbar from "../components/ProjectNavbar";
import { SidePanel } from "../components/SidePanel";
import { acceptInvitation } from "../redux/invitation/thunk";
import { useAppDispatch, useAppSelector } from "../store";

export function Home() {

    const token = localStorage.getItem('invitation')
    const userId = useAppSelector(state => state.auth.userId)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        token && dispatch(acceptInvitation(token, userId!))
        token && localStorage.removeItem('invitation')
    })

    return (
        <div id='home-page'>
            <SidePanel/>
            <ProjectNavbar />
        </div>
    )
}
