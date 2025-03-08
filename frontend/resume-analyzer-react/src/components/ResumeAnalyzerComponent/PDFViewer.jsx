import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf"; // Ensure correct import
import pdfWorker from "pdfjs-dist/build/pdf.worker?url"; // Load worker for Vite

// Set PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

// PDF Viewer Container
const ViewerContainer = styled.div`
  width: 90%; /* Adjust width to fit within flexbox */
  max-width: 500px; /* Prevent overflow */
  height: 80vh; /* Set height relative to viewport */
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const PDFViewer = ({ file }) => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const renderPdf = async () => {
      try {
        const loadingTask = pdfjs.getDocument(file);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const containerWidth = 500; // Match `max-width` in `ViewerContainer`
        const viewport = page.getViewport({ scale: 1.0 });
        const scale = containerWidth / viewport.width; // Scale dynamically

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const scaledViewport = page.getViewport({ scale });

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };
        await page.render(renderContext).promise;
        setLoading(false);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    renderPdf();
  }, [file]);

  return (
    <ViewerContainer>
      {loading && <p>Loading PDF...</p>}
      <canvas ref={canvasRef}></canvas>
    </ViewerContainer>
  );
};

export default PDFViewer;


