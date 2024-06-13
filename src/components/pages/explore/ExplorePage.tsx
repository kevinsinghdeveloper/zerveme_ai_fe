import React, {PropsWithChildren, ReactNode, useEffect, useState} from "react";
import {
    Accordion,
    Button, Card,
    Col, Collapse,
    Container, Dropdown,
    Form, Image, InputGroup, ListGroup,
    Row, Table
} from "react-bootstrap";
import Select, {GroupBase, OptionsOrGroups} from 'react-select';
import DatePicker from 'react-datepicker';
import "./ExplorePageStyles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartBar, faChartLine, faChartPie, faLineChart} from "@fortawesome/free-solid-svg-icons";
import xmark from "../../../assets/xmark.png";
import expandicon from "../../../assets/expand.png";
import {useExplorerContext} from "../../context_providers/ExplorerContext";
import {useAuthContext} from "../../context_providers/AuthContext";

/*
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
*/
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
        zIndex: 2,
        ':hover': {
            backgroundColor: '#666', // Background color when hovered
            color: '#fff', // Text color
        },
    })
};

interface SidebarProps {
    sideBarTitle: string,
    defaultWidth: number;
    minWidth: number;
    maxWidth: number;
    children: React.ReactNode;
    draggable?: boolean; // Add draggable prop
}

type OptionType = { value: string; label: string };

// Placeholder options for dimensions and KPIs
const dimensionOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>> = [
    {value: 'dimension1', label: 'Dimension 1'},
    {value: 'dimension2', label: 'Dimension 2'},
    {value: 'dimension3', label: 'Dimension 3'},
];

const kpiOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>> = [
    {value: 'kpi1', label: 'KPI 1'},
    {value: 'kpi2', label: 'KPI 2'},
    {value: 'kpi3', label: 'KPI 3'},
];

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
    const handleVisualizationSelect = (visualizationType: any) => {
        setSelectedVisualization(visualizationType);
    };
    const {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        selectedDimensions,
        setSelectedDimensions,
        selectedKPIs,
        setSelectedKpis,
        selectedVisualization,
        setSelectedVisualization,
        handleSubmit,
        getAllDatasets, datasets
    } = useExplorerContext();

    useEffect(() => {
        getAllDatasets();
    }, [datasets]);

    // cdc data a3684976-2b07-43cf-b2bb-cd43309fdcff
    return (
        <Container fluid style={{marginTop: '50px'}}>
            <Row id="content_row">
                <Col sm={2}>
                    <Sidebar sideBarTitle="Filters" defaultWidth={75} minWidth={200} maxWidth={400} draggable={false}>
                        <ul style={{paddingLeft: '0'}}>
                            <li style={{marginBottom: '20px'}}>
                                <span
                                    className="side-bar-label">Periods</span>
                                <InputGroup className="mb-3 d-flex">
                                    <div className="flex-fill mr-2" style={{width: '25%', height: '25px'}}>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date: Date | null) => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            placeholderText="Start Period"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="flex-fill" style={{width: '25%', height: '25px'}}>
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
                                    </div>
                                </InputGroup>
                            </li>

                            <li style={{marginBottom: '20px'}}>
                                <span className="side-bar-label" style={{color: '#fff'}}>Dimension Selection</span>
                                <Select
                                    options={dimensionOptions}
                                    isMulti
                                    isSearchable
                                    value={selectedDimensions}
                                    styles={customStyles}
                                    onChange={(selected) => setSelectedDimensions(selected as OptionType[])}
                                />
                            </li>

                            <li style={{marginBottom: '20px'}}>
                                <span className="side-bar-label" style={{color: '#fff'}}>KPI Selection</span>
                                <Select
                                    options={kpiOptions}
                                    isMulti
                                    isSearchable
                                    value={selectedKPIs}
                                    styles={customStyles}
                                    onChange={(selected) => setSelectedKpis(selected as OptionType[])}
                                />
                            </li>

                            <li style={{marginBottom: '20px'}}>
                                <span className="side-bar-label">Visualization Selection</span>
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
                                            zIndex: 0,
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
                                            zIndex: 0,
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
                                            zIndex: 0,
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
                                <Button style={{backgroundColor: '#a864f4'}} type="submit"
                                        onClick={handleSubmit}>Query</Button>
                            </li>
                        </ul>
                    </Sidebar>
                </Col>

                <Col sm={10}>
                    <Container fluid>
                        <Row>
                            {/* First row for displaying data */}
                            <Col>
                                viz
                            </Col>
                        </Row>
                        <Row>
                            {/* Second row for additional controls or information */}
                            <Col>
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Larry the Bird</td>
                                        <td>@twitter</td>
                                        <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>

    )
}