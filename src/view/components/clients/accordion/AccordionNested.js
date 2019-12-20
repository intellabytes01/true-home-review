import React, { Component } from 'react';

import { Accordion, Menu } from 'semantic-ui-react';
import PanelHeader from '../../manageData/managePanel/PanelHeader';
import PanelBody from '../clientPanel/PanelBody';


const AccordionContent = () => (
    <div className="indent ml-0">
        <div className="panel mb-0">
            <PanelBody />
        </div>
    </div>
)

const SubAccordion1Panels = [
    {
        title: 'HM-2-1-0',
        content: { content: AccordionContent('11 Content'), key: '11-content' },
        key: 'sub-accordion-11'
    }, {
        title: 'Sub Accordion 12',
        content: { content: AccordionContent('12 Contents'), key: '12-content' },
        key: 'sub-accordion-12'
    }, {
        title: 'Sub Accordion 13',
        content: { content: AccordionContent('13 Contents'), key: '13-content' },
        key: 'sub-accordion-13'
    },
]

const SubAccordion1Content = (
    <div className="indent">
        <Accordion
            style={{ marginLeft: "20px" }}
            className="no-padding"
            panels={SubAccordion1Panels}
        />
    </div>
)
const SubAccordionPanels = [
    {
        title: 'Randolph',
        content: { content: SubAccordion1Content, key: 'sa1-content' },
        key: 'sub-accordion-1'
    }, {
        title: 'Museum District',
        content: { content: SubAccordion1Content, key: 'sa2-content' },
        key: 'sub-accordion-2'
    }, {
        title: 'Origon Hill',
        content: { content: AccordionContent('SA3 Content'), key: 'sa3-content' },
        key: 'sub-accordion-3'
    }
]


const SubAccordions = (
    <div className="indent title-bg">
        <Accordion
            className="no-padding"
            panels={SubAccordionPanels}

        />
    </div>
)

const AccordionPanels = [
    { title: 'Associated Neighborhood', content: { content: SubAccordions, key: 'sub-accordions' } },
]

const AccordionExampleNested = () => (
    <Accordion
        defaultActiveIndex={0}
        panels={AccordionPanels}
    />
)

class AccordionNested extends Component {
    render() {
        return (
            <AccordionExampleNested />
        )
    }
}

export default AccordionNested;
