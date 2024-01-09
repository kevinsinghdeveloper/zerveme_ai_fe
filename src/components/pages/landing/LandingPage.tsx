import {PropsWithChildren} from "react";
import AppHeader from '../../shared/header/AppHeader'

export default function LandingPage(props: PropsWithChildren) {

    return (
        <>
            <AppHeader style={{width: '90%'}} className="ml-auto mr-auto"></AppHeader>
            <body>hellow world</body>
        </>
    )
}