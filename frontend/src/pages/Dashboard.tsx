import React, { useEffect } from "react";
import { NavbarLayout } from "../components/NavbarLayout";
import { getTable } from "../redux/table/thunk";
import { useAppDispatch, useAppSelector } from "../store";

export function Dashboard() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.userId)

    useEffect(()=>{
        dispatch(getTable(userId as number))
    },[dispatch, userId])

    return (
        <div>
            <NavbarLayout />
            <div>
                dashboard
            </div>
        </div>
    );
}
