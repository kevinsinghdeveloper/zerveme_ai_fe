import React, {PropsWithChildren, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import {
    Button,
    Col,
    Container,
    Image, InputGroup, ListGroup,
    Row, Table
} from "react-bootstrap";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "./ExplorePageStyles.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartBar, faChartPie, faLineChart, faArrowsSpin} from "@fortawesome/free-solid-svg-icons";
import xmark from "../../../assets/xmark.png";
// import expandicon from "../../../assets/expand.png";
import {useExplorerContext} from "../../context_providers/ExplorerContext";
// import {useAuthContext} from "../../context_providers/AuthContext";

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
/*
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
*/
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

const DataTable = () => {
    const {fetchedData} = useExplorerContext();
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        if (fetchedData && fetchedData.length > 0) {
            const columnNames = Object.keys(fetchedData[0]);
            setColumns(columnNames);
        }
    }, [fetchedData]);

    return (
        <Table responsive>
            <thead>
            <tr>
                <th>#</th>
                {columns.map((column) => (
                    <th key={column}>{column}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {fetchedData && fetchedData.length > 0 ? (
                fetchedData.map((item: any, index: any) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        {columns.map((column) => (
                            <td key={column}>{item[column]}</td>
                        ))}
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={columns.length + 1}>No data available</td>
                </tr>
            )}
            </tbody>
        </Table>
    );
};

export default function ExplorePage(props: PropsWithChildren) {
    const handleVisualizationSelect = (visualizationType: any) => {
        setSelectedVisualization(visualizationType);
    };
    //const [selectedDatasetId, setSelectedDatasetId] = useState<string>(''); // State for selected dataset ID
    const [datasetOptions, setDatasetOptions] = useState<OptionType[]>([]); // State for dataset options in dropdown
    const [dimensionOptions, setDimensionOptions] = useState([]);
    const [kpiOptions, setKpiOptions] = useState([]);
    const [periodStart, setPeriodStart] = useState<Date | null>(null);
    const [periodEnd, setPeriodEnd] = useState<Date | null>(null);
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
        getDataOnSubmit,
        datasets,
        getAllDatasets,
        selectedDatasetId,
        setSelectedDatasetId,
        getDatasetPreview,
        selectedDatasetDomainOptions,
        getDatasetDomainOptions
    } = useExplorerContext();

    /*
    useEffect(() => {
        getAllDatasets();
    }, [getAllDatasets]);
    */
    useEffect(() => {
        if (datasets) {
            setDatasetOptions(datasets.map((dataset: any) => ({value: dataset.id, label: dataset.name})));
        }
    }, [datasets]);

    const handleDatasetSelect = useCallback((selectedOption: OptionType | null) => {
        setSelectedDatasetId(selectedOption ? selectedOption.value : '');

    }, [selectedDatasetId]);

    const handlePreview = useCallback(() => {
        if (selectedDatasetId) {
            getDatasetPreview();
        }
    }, [selectedDatasetId, getDatasetPreview]);

    const handleFetchDatasets = useCallback(() => {
        if (datasets) {
            getAllDatasets()
        }
    }, [getAllDatasets, datasets]);

    const handleSelectDataset = useCallback(async () => {
        if (selectedDatasetId) {
            await getDatasetDomainOptions();
        }
    }, [getDatasetDomainOptions, selectedDatasetId]);

    useMemo(() => {
        if (selectedDatasetDomainOptions) {
            const kpiOptions = selectedDatasetDomainOptions.kpi_cols.map((kpi: string) => ({
                value: kpi,
                label: kpi.charAt(0).toUpperCase() + kpi.slice(1).replace(/_/g, ' ')
            }));
            const dimensionOptions = selectedDatasetDomainOptions.attr_cols.map((attr: string) => ({
                value: attr,
                label: attr.charAt(0).toUpperCase() + attr.slice(1).replace(/_/g, ' ')
            }));

            setKpiOptions(kpiOptions);
            setDimensionOptions(dimensionOptions);
            setPeriodStart(selectedDatasetDomainOptions.period_start);
            setPeriodEnd(selectedDatasetDomainOptions.period_end);
        }

    }, [selectedDatasetDomainOptions]);


    // TODO query the above
    return (
        <Container fluid style={{marginTop: '50px'}}>
            <Row id="content_row">
                <Col sm={2}>
                    <Sidebar sideBarTitle="Filters" defaultWidth={75} minWidth={200} maxWidth={400} draggable={false}>
                        <ul style={{paddingLeft: '0'}}>
                            <li style={{marginBottom: '20px'}}>
                                <span className="side-bar-label">Dataset Selection</span>
                                <Select
                                    options={datasetOptions}
                                    isSearchable
                                    styles={customStyles}
                                    value={datasetOptions.find((option) => option.value === selectedDatasetId)}
                                    onChange={handleDatasetSelect}
                                />
                                <Button className="mt-2" style={{backgroundColor: '#a864f4'}}
                                        onClick={handlePreview}>Preview</Button>
                                <Button className="mt-2 ml-2" style={{backgroundColor: '#a864f4'}}
                                        onClick={handleSelectDataset}>Target Dataset</Button>
                                <Button className="mt-2 float-right" style={{backgroundColor: '#a864f4'}}
                                        onClick={handleFetchDatasets}><FontAwesomeIcon icon={faArrowsSpin}
                                /></Button>
                            </li>
                            <li style={{marginBottom: '20px'}}>
                                <span
                                    className="side-bar-label">Periods</span>
                                <InputGroup className="mb-3 d-flex">
                                    <div className="flex-fill mr-2" style={{width: '25%', height: '25px'}}>
                                        <DatePicker
                                            selected={periodStart}
                                            onChange={(date: Date | null) => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            placeholderText="Start Period"
                                            className="form-control"
                                            minDate={periodStart ?? undefined}
                                            maxDate={periodEnd ?? undefined}
                                        />
                                    </div>
                                    <div className="flex-fill" style={{width: '25%', height: '25px'}}>
                                        <DatePicker
                                            selected={periodEnd}
                                            onChange={(date: Date | null) => setEndDate(date)}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            placeholderText="End Period"
                                            className="form-control"
                                            minDate={startDate ?? undefined}
                                            maxDate={periodEnd ?? undefined}
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
                                        onClick={getDataOnSubmit}>Query</Button>
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
                                <DataTable/>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>

    )
}