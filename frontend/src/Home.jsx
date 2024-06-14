import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import axios from "axios";
import bg from './assets/bg.png';  // Import background image correctly

const Container = styled.div`
  max-width: 600px;
  margin: 4% auto;
  padding: 20px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
`;

const Background = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding-top: 8vh; // To push down the container below the top section
`;

const Top = styled.div`
  width: 100%;
  margin: 0 0;
  text-align: center;
  height: 8vh;
  background-color: black;
  color: white;
  padding-top: 20px;
  font-weight: bold;
  font-size: 24px;
`;

const DropzoneContainer = styled.div`
  border: 2px dashed #007bff;
  padding: 40px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  cursor: pointer;
`;

const UploadButton = styled.button`
  background-color: #007bff;
  color: ${({ disabled }) => (disabled ? 'black' : 'white')};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #cccccc;
  }
`;

const ClearButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;

const Loading = styled.div`
  margin-top: 20px;
`;

const Result = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #71b280 0%, #134e5e 100%);
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  h3 {
    margin-bottom: 10px;
  }
  h2 {
    margin: 0;
  }
`;

const Heading = styled.h2`
  color: #2f4f4f;  // Dark green color
`;

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post("http://localhost:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data.class);
    } catch (error) {
      console.error("Error uploading file: ", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setResult(null);
  };

  return (
    <>
      <Top>
        Welcome to the Potato-Disease-Predictor
      </Top>

      <Background>
        <Container>
          <Heading>Upload Image of a Potato Leaf</Heading>
          <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            {selectedFile ? (
              <p>{selectedFile.name}</p>
            ) : (
              <p>Drag and drop an image, or click to select one</p>
            )}
          </DropzoneContainer>
          <div>
            <UploadButton onClick={handleUpload} disabled={!selectedFile || loading}>
              Upload
            </UploadButton>
            <ClearButton onClick={clearFile} disabled={!selectedFile && !result}>
              Clear
            </ClearButton>
          </div>
          {loading && <Loading>Loading...</Loading>}
          {result && (
            <Result>
              <h3>Result</h3>
              <h2>{result}</h2>
            </Result>
          )}
        </Container>
      </Background>
    </>
  );
};

export default Home;
