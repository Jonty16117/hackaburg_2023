import React, { useState } from 'react';
import { Form, Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import axios from 'axios';

const ControlPart = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [sliderValue1, setSliderValue1] = useState(0);
  const [sliderValue2, setSliderValue2] = useState(0);
  const [sliderValue3, setSliderValue3] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSliderChange1 = (event) => {
    setSliderValue1(event.target.value);
  };

  const handleSliderChange2 = (event) => {
    setSliderValue2(event.target.value);
  };

  const handleSliderChange3 = (event) => {
    setSliderValue3(event.target.value);
  };

  const handleUpload = () => {
    setUploadStatus('uploading');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploadProgress(0);
        setUploadStatus('uploaded');

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('use_model', 123123123);

        let url = 'http://localhost:3000/api/v1/predict_temp_range_gbr';
        if (selectedOption === 'random_forest') {
          url = 'http://localhost:3000/api/v1/predict_temp_range_rfr';
        }

        axios
          .post(url, formData)
          .then((response) => {
            console.log('File uploaded successfully:', response.data);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
          });
      }
    }, 250);
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

          <Row className="justify-content-center pt-4">
            <Col md={10}>
              <Form.Group controlId="slider1">
                <Form.Label>
                  Motor Speed: {sliderValue1}
                </Form.Label>
                <Form.Control
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue1}
                  onChange={handleSliderChange1}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-center pt-4">
            <Col md={10}>
              <Form.Group controlId="slider2">
                <Form.Label>
                  State of Charge: {sliderValue2}
                </Form.Label>
                <Form.Control
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue2}
                  onChange={handleSliderChange2}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-center pt-4">
            <Col md={10}>
              <Form.Group controlId="slider3">
                <Form.Label>
                  Cooling Temperature: {sliderValue3}
                </Form.Label>
                <Form.Control
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue3}
                  onChange={handleSliderChange3}
                />
              </Form.Group>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Container>
  );
};

export default ControlPart;