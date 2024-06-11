import React, {PropsWithChildren, ReactNode, useState} from "react";
import {
    Accordion,
    Button, Card,
    Col, Collapse,
    Container, Dropdown,
    Form, Image, InputGroup, ListGroup,
    Row
} from "react-bootstrap";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "./ExplorePageStyles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartBar, faChartLine, faChartPie, faLineChart} from "@fortawesome/free-solid-svg-icons";
import xmark from "../../../assets/xmark.png";
import expandicon from "../../../assets/expand.png";

const dimensionOptions = [
    {value: 'dimension1', label: 'Dimension 1'},
    {value: 'dimension2', label: 'Dimension 2'},
    {value: 'dimension3', label: 'Dimension 3'},
];

const kpiOptions = [
    {value: 'kpi1', label: 'KPI 1'},
    {value: 'kpi2', label: 'KPI 2'},
    {value: 'kpi3', label: 'KPI 3'},
];

const customStyles = {
    control: (provided: any) => ({
        ...provided,
        borderColor: '#ccc', // Your desired border color
        color: '#fff', // Your desired text color
    }),
    multiValue: (provided: any) => ({
        ...provided,
    }),
    multiValueLabel: (provided: any) => ({
        ...provided,
        color: '#a864f4'
    }),
    multiValueRemove: (provided: any) => ({
        ...provided,
        ':hover': {
            backgroundColor: '#a864f4',
            color: '#fff',
        },
    }),
    input: (provided: any) => ({
        ...provided,
        color: '#a864f4', // Your desired search input text color
    }),
    option: (provided: any) => ({
        ...provided,
        backgroundColor: '#a864f4', // Background color when not hovered or selected
        color: '#fff', // Text color
        ':hover': {
            backgroundColor: '#666', // Background color when hovered
            color: '#fff', // Text color
        },
    })
};

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
    sideBarTitle: string,
    defaultWidth: number;
    minWidth: number;
    maxWidth: number;
    children: React.ReactNode;
    draggable?: boolean; // Add draggable prop
}


const Sidebar: React.FC<SidebarProps> = ({
                                             sideBarTitle,
                                             defaultWidth,
                                             minWidth,
                                             maxWidth,
                                             draggable = true,
                                             children
                                         }) => {
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
        <div className="sidebar-container rounded-t-lg" style={{width: `${sidebarWidth}%`}}>
            <div className="side-bar-title rounded-t-lg">
                {sideBarTitle}
                <Image className="float-right" src={xmark}/>
            </div>
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
    const [selectedVisualization, setSelectedVisualization] = useState('');

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);


    const handleVisualizationSelect = (visualizationType: any) => {
        setSelectedVisualization(visualizationType);
    };
    return (
        <Container fluid>
            <Row id="content_row">
                <Col sm={3}>
                    <Sidebar sideBarTitle="Filters" defaultWidth={100} minWidth={200} maxWidth={400} draggable={false}>
                        <ul>
                            <li style={{marginBottom: '20px'}}>
                                <h5>Periods (Make multi, we can select periods to include)</h5>
                                <InputGroup className="mb-3">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date: Date | null) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        placeholderText="Start Period"
                                        className="form-control"
                                    />
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date: Date | null) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        placeholderText="End Period"
                                        className="form-control"
                                        minDate={startDate}
                                    />
                                </InputGroup>
                            </li>

                            <li style={{marginBottom: '20px'}}>
                                <h5 style={{color: '#fff'}}>Dimension Selection</h5>
                                <Select
                                    options={dimensionOptions}
                                    isMulti
                                    isSearchable
                                    styles={customStyles}
                                />
                            </li>

                            <li style={{marginBottom: '20px'}}>
                                <h5 style={{color: '#fff'}}>KPI Selection</h5>
                                <Select
                                    options={kpiOptions}
                                    isMulti
                                    isSearchable
                                    styles={customStyles}
                                />
                            </li>

                            <li style={{marginBottom: '20px'}}>
                                <h5>Visualization Selection</h5>
                                <ListGroup horizontal>
                                    <ListGroup.Item
                                        action
                                        active={selectedVisualization === 'bar'}
                                        onClick={() => handleVisualizationSelect('bar')}
                                        style={{
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            padding: '0',
                                            width: '100%', // Ensure the item fills the container width
                                            height: '100%', // Ensure the item fills the container height
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: selectedVisualization === 'bar' ? '#a864f4' : 'transparent', // Example background color
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faChartBar}
                                            size="3x" // Adjust icon size as needed
                                            style={{color: '#fff'}} // Example: set icon color
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        action
                                        active={selectedVisualization === 'line'}
                                        onClick={() => handleVisualizationSelect('line')}
                                        style={{
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            padding: '0',
                                            width: '100%', // Ensure the item fills the container width
                                            height: '100%', // Ensure the item fills the container height
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: selectedVisualization === 'line' ? '#a864f4' : 'transparent', // Example background color
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faLineChart}
                                            size="3x" // Adjust icon size as needed
                                            style={{color: '#fff'}} // Example: set icon color
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        action
                                        active={selectedVisualization === 'pie'}
                                        onClick={() => handleVisualizationSelect('pie')}
                                        style={{
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            padding: '0',
                                            width: '100%', // Ensure the item fills the container width
                                            height: '100%', // Ensure the item fills the container height
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: selectedVisualization === 'pie' ? '#a864f4' : 'transparent', // Example background color
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faChartPie}
                                            size="3x" // Adjust icon size as needed
                                            style={{color: '#fff'}} // Example: set icon color
                                        />
                                    </ListGroup.Item>
                                </ListGroup>
                            </li>

                            <li>
                                <Button style={{backgroundColor: '#a864f4'}} type="submit">Query</Button>
                            </li>
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