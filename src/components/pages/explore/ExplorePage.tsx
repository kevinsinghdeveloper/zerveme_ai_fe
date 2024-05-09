import React, {PropsWithChildren, ReactNode, useState} from "react";
import {
    Accordion,
    Button, Card,
    Col, Collapse,
    Container,
    Row
} from "react-bootstrap";
import {Resizable} from "react-resizable";
import "./ExplorePageStyles.css"
//
// const CollapsibleNavigation = () => {
//     const [open, setOpen] = useState(true);
//
//     return (
//         <Container fluid>
//             <Row>
//                 <Col>
//                     <Button
//                         onClick={() => setOpen(!open)}
//                         aria-controls="example-collapse-text"
//                         aria-expanded={open}
//                         className="mt-3"
//                     >
//                         Toggle Navigation
//                     </Button>
//                     <Collapse in={open}>
//                         <div id="example-collapse-text" className="mt-3">
//                             {/* Add your navigation links here */}
//                             <ul>
//                                 <li><a href="#">Link 1</a></li>
//                                 <li><a href="#">Link 2</a></li>
//                                 <li><a href="#">Link 3</a></li>
//                             </ul>
//                         </div>
//                     </Collapse>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };
interface SidebarProps {
    defaultWidth: number;
    minWidth: number;
    maxWidth: number;
    children: React.ReactNode;
    draggable?: boolean; // Add draggable prop
}


const Sidebar: React.FC<SidebarProps> = ({defaultWidth, minWidth, maxWidth, draggable = true, children}) => {
    const [sidebarWidth, setSidebarWidth] = useState(defaultWidth);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!draggable) return; // Check if dragging is enabled
        setIsResizing(true);
        setDragStartX(event.clientX);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isResizing) return;
        const delta = event.clientX - dragStartX;
        const newWidth = Math.max(minWidth, Math.min(sidebarWidth + delta, maxWidth));
        setSidebarWidth(newWidth);
        setDragStartX(event.clientX);
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    }

    return (
        <div className="sidebar-container" style={{width: `${sidebarWidth}px`}}>
            <div className="sidebar-content">{children}</div>
            {draggable && ( // Render resizer and overlay only if dragging is enabled
                <>
                    <div className={`resizer ${isResizing ? 'resizing' : ''}`} onMouseDown={handleMouseDown}/>
                    <div className="overlay" style={{display: isResizing ? 'block' : 'none'}}
                         onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}/>
                </>
            )}
        </div>
    );
};


export default function ExplorePage(props: PropsWithChildren) {
    return (
        <Container fluid>
            <Row id="content_row">
                <Col sm={3}>
                    <Sidebar defaultWidth={250} minWidth={200} maxWidth={400} draggable={false}>
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                        </ul>
                    </Sidebar>
                </Col>

                <Col sm={9}>
                    <Container fluid>
                        <Row>
                            {/* First row for displaying data */}
                            <Col>
                                1
                            </Col>
                        </Row>
                        <Row>
                            {/* Second row for additional controls or information */}
                            <Col>
                                2
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>

    )
}