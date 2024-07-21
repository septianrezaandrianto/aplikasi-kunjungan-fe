import React, { useState, useCallback, useRef, useEffect } from 'react';
import Webcam from "react-webcam";
import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import '../../assets/WebcamStyle.css'; // Import the CSS file

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user"
};

export const WebcamCapture = ({ onCapture, reset }) => {
    const [image, setImage] = useState('');
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        onCapture(imageSrc); // Call the onCapture callback with the image
    }, [webcamRef, onCapture]);

    useEffect(() => {
        if (reset) {
            setImage('');
        }
    }, [reset]);

    return (
        <div className="webcam-container">
            <div className="webcam-img">
                {image === '' ? (
                    <Webcam
                        audio={false}
                        height={400}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={400}
                        videoConstraints={videoConstraints}
                    />
                ) : (
                    <img src={image} alt="Captured" />
                )}
            </div>
            <div>
                {image !== '' ? (
                    <Button style={{ width: '275%', marginLeft: '-88%' }}
                        className="webcam-button"
                        type="primary" danger
                        icon={<PoweroffOutlined />}
                        onClick={(e) => {
                            e.preventDefault();
                            setImage('');
                        }}
                    >
                        Retake Image
                    </Button>
                ) : (
                    <Button style={{ width: '350%', marginLeft: '-130%' }}
                        className="webcam-button"
                        type="primary" danger
                        icon={<PoweroffOutlined />}
                        onClick={(e) => {
                            e.preventDefault();
                            capture();
                        }}
                    >
                        Capture
                    </Button>
                )}
            </div>
        </div>
    );
};
