import React, { useState, useCallback, useRef } from 'react';
import Webcam from "react-webcam";
import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import '../assets/WebcamStyle.css'; // Import the CSS file

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user"
};

export const WebcamCapture = () => {

    const [image, setImage] = useState('');
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        console.log("Base64 Image: ", imageSrc); // Log the base64 value
    }, [webcamRef, setImage]);

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
                    <Button
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
                    <Button
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