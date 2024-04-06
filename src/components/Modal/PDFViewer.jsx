import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./modalstyles.module.css";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ docPreview }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <>
      <button className={styles.viewFile} onClick={handleShow}>
        View File
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        // backdrop="static"
        keyboard={false}
        className={styles.docModal}
      >
        <Modal.Body style={{ maxHeight: 600, overflow: "scroll" }}>
          <Document file={docPreview} onLoadSuccess={onDocumentLoadSuccess}>
            <Page size="A5" pageNumber={pageNumber} />
          </Document>
        </Modal.Body>

        <Modal.Footer>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <button className={styles.cancelBtn} onClick={handleClose}>
            Close
          </button>
          <button
            className={styles.createBtn}
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
          >
            Previous
          </button>
          <button
            className={styles.createBtn}
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
          >
            Next
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PDFViewer;
