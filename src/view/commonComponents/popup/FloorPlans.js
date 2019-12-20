import React from 'react';
import { Modal, ModalBody, Carousel, CarouselControl } from 'reactstrap';
import ButtonPrimary from '../buttons/ButtonPrimary';

const FloorPlans = ({ printPDF, togglePlansPopup, plansPopup, className, activeIndex, next, previous, slides }) => (
    <div>
        {/* <Button color="danger" onClick={togglePlansPopup}>{this.props.buttonLabel}</Button> */}
        <Modal centered={true} isOpen={plansPopup} toggle={togglePlansPopup} className='modal-xl' >
            {/* <ModalHeader toggle={togglePlansPopup}>Modal title</ModalHeader> */}
            <div className="floor-plans-popup-wrapper">
                <ModalBody>
                    <Carousel
                        activeIndex={activeIndex}
                        next={next}
                        previous={previous}
                    >
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                    </Carousel>
                </ModalBody>
                <div className="clearfix pr-4 pl-4 pb-3 pt-3">
                    <div className="float-left">
                        <ButtonPrimary btntext={'Print'} onClick={() => printPDF && printPDF(activeIndex)} type="button" className={'button-primary'} />
                    </div>
                    {/* <div className="float-right">
                        <i class="icon-Share share-floorplan"></i>
                    </div> */}
                </div>
            </div>
        </Modal>
    </div>
);

export default FloorPlans;