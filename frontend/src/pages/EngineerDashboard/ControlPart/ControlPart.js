import React, { useState } from 'react';
import { Form, Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';

const ControlPart = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [sliderValues, setSliderValues] = useState([0, 0, 0]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSliderChange = (event, sliderIndex) => {
        const newSliderValues = [...sliderValues];
        newSliderValues[sliderIndex] = event.target.value;
        setSliderValues(newSliderValues);
    };

    const handleUpload = () => {
        setUploadStatus('uploading');
        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setSelectedFile(null);
                setUploadProgress(0);
                setUploadStatus('uploaded');
            }
        }, 1000);
    };

    const isFileSelected = selectedFile !== null;

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={10}>
                    <Form.Group controlId="filePicker">
                        <Form.Label>Load dataset to the model:</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-center pt-4">
                <Col md={6} className="text-center">
                    <Button
                        variant="primary"
                        onClick={handleUpload}
                        style={{ width: '300px' }} 
                        disabled={(uploadStatus === 'uploading' || uploadStatus === '') && !isFileSelected}
                    >
                        {uploadStatus === 'uploading' ? (
                            <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
                        ) : (
                            'Load'
                        )}
                    </Button>
                </Col>
            </Row>

            {uploadStatus === 'uploaded' && (
                <React.Fragment>
                    <Row className="justify-content-center pt-4">
                        <Col md={10}>
                            <Form.Group controlId="dropdown">
                                <Form.Label>Select model type:</Form.Label>
                                <Form.Control as="select" value={selectedOption} onChange={handleDropdownChange}>
                                    <option value="">Select</option>
                                    <option value="random_forest">Random Forest</option>
                                    <option value="gradient_boosting">Gradient Boosting</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    {sliderValues.map((value, index) => (
                        <Row className="justify-content-center pt-4" key={`slider${index + 1}`}>
                            <Col md={10}>
                                <Form.Group controlId={`slider${index + 1}`}>
                                    <Form.Label>
                                        Slider {index + 1}: {value}
                                    </Form.Label>
                                    <Form.Control
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={value}
                                        onChange={(event) => handleSliderChange(event, index)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    ))}
                </React.Fragment>
            )}
        </Container>
    );
};

export default ControlPart;
