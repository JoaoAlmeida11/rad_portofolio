import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from 'react-router-dom';


// import serviceWorkerPDF from '../pdf.worker.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faSearchPlus,
  faSearchMinus,
  faExpand,
  faCompress,
} from '@fortawesome/free-solid-svg-icons';
import rad0 from '../../pdfFiles/revista_rad_00.pdf'; //guarda-se na API apenas o nome do ficheiro pelo que o caminho tem de ser feito no frontend
import rad1 from '../../pdfFiles/revista_rad_01.pdf'; //guarda-se na API apenas o nome do ficheiro pelo que o caminho tem de ser feito no frontend
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export interface InterfaceRevistaPDF {
  pdf: string;
}
const ORIGIN = process.env.REACT_APP_DOMAIN_ORIGIN;
export interface ParamTypes {
  revistaId: string;
}

export default function RevistaPDF(props: InterfaceRevistaPDF) {
  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  // attempting to force display it
  // const { revistaId } = useParams<ParamTypes>();

  const revistaFile = (props.pdf === "static/media/revista_rad_01.2443664b.pdf") ? rad1 : rad0;

  const [file, setFile] = useState(revistaFile);
  // console.log('props.pdf ->', props.pdf)

  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  // to avoid flashing keep the page before visible unitl the next one renders
  const [renderedPageNumber, setRenderedPageNumber] = useState(1);

  const [pdfCanvaSizeDynamic, setPdfCanvaSizeDynamic] =
    useState('pdf-canva-normal');
  const [zoomIcon, setZoomIcon] = useState(faSearchPlus);
  const [fullscreen, setFullscreen] = useState(false);
  const [arrowLeftColor, setArrowLeftColor] = useState('black');
  const [arrowRightColor, setArrowRightColor] = useState('white');
  const [zoomIconColor, setZoomIconColor] = useState('white');
  const [fullscreenIcon, setFullscreenIcon] = useState('white');

  // auto handleResize
  const [dimensionsWidth, setDimensionsWidth] = useState(window.innerWidth);
  const [arrowShowWidth, setArrowShowWith] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      if (dimensionsWidth < 1200 && window.innerWidth >= 1200) {
        setDimensionsWidth(window.innerWidth);
      } else if (dimensionsWidth >= 1200 && window.innerWidth < 1200)
        setDimensionsWidth(window.innerWidth);

      if (arrowShowWidth < 700 && window.innerWidth >= 700) {
        setArrowShowWith(window.innerWidth);
      } else if (arrowShowWidth >= 700 && window.innerWidth < 700)
        setArrowShowWith(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  // when the page is loaded the PDF navigation is set
  const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };
  // pdf page navigation
  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };
  const nextPage = () => {
    if (pageNumber + 1 < numPages) {
      if (pageNumber === 1 || window.innerWidth < 1200) changePage(1);
      else changePage(2);
      setArrowLeftColor('white');
    }
  };
  const previousPage = () => {
    if (pageNumber > 1) {
      if (pageNumber === 2 || window.innerWidth < 1200) changePage(-1);
      else changePage(-2);
      setArrowRightColor('white');
    } else setArrowLeftColor('black');
  };
  // show arrows only when they are needed
  // const leftArrowColor = pageNumber <= 1 ? 'black' : 'white';
  // const handleRightArrowColor = pageNumber + 1 === numPages ? 'black' : 'white';
  const handleLeftArrowColor = () =>
    pageNumber <= 1 ? setArrowLeftColor('black') : setArrowLeftColor('white');

  const handleRightArrowColor = () => {
    if (window.innerWidth < 1200) {
      if (pageNumber === numPages) setArrowRightColor('black');
      else setArrowRightColor('white');
    } else {
      if (numPages % 2 !== 0 && pageNumber + 1 === numPages)
        setArrowRightColor('black');
      else if (numPages % 2 === 0 && pageNumber === numPages)
        setArrowRightColor('black');
      else setArrowRightColor('white');
    }
  };

  // react-fullscreen
  const handle = useFullScreenHandle();
  const handleEnterFullscreen = () => {
    setFullscreen(true);
    if (pdfCanvaSizeDynamic === 'pdf-canva-normal')
      setPdfCanvaSizeDynamic('pdf-canva-fullscreen-normal');
    else setPdfCanvaSizeDynamic('pdf-canva-fullscreen-ampliado');

    handle.enter();
  };
  const handleExitFullscreen = () => {
    setFullscreen(false);
    if (pdfCanvaSizeDynamic === 'pdf-canva-fullscreen-normal')
      setPdfCanvaSizeDynamic('pdf-canva-normal');
    else setPdfCanvaSizeDynamic('pdf-canva-ampliado');

    // in case the document is not active tries again and if still doesn't work logs the error
    try {
      document.exitFullscreen();
    } catch (e) {
      try {
        document.exitFullscreen();
      } catch (e) {
        // console.log('Ocorreu um erro a sair do fullscreen');
      }
    }
  };

  // zoom in and out
  const HandleZoom = () => {
    if (fullscreen === false) {
      if (pdfCanvaSizeDynamic === 'pdf-canva-normal') {
        setPdfCanvaSizeDynamic('pdf-canva-ampliado');
        setZoomIcon(faSearchMinus);
      } else {
        setPdfCanvaSizeDynamic('pdf-canva-normal');
        setZoomIcon(faSearchPlus);
      }
    } else if (fullscreen === true) {
      if (pdfCanvaSizeDynamic === 'pdf-canva-fullscreen-normal') {
        setPdfCanvaSizeDynamic('pdf-canva-fullscreen-ampliado');
        setZoomIcon(faSearchMinus);
      } else {
        setPdfCanvaSizeDynamic('pdf-canva-fullscreen-normal');
        setZoomIcon(faSearchPlus);
      }
    }
  };

  // dynamic nº of pages shown (requires page to be reloaded)
  const isLoading = renderedPageNumber !== pageNumber;

  let prevMultipleRenders = null;
  if (
    (isLoading &&
      renderedPageNumber &&
      window.innerWidth < 1200 &&
      pageNumber === 1 &&
      pageNumber === numPages) ||
    (isLoading &&
      renderedPageNumber &&
      window.innerWidth < 1200 &&
      pageNumber === 1 &&
      pageNumber + 1 === numPages)
  )
    prevMultipleRenders = false;
  else if (
    isLoading &&
    renderedPageNumber &&
    window.innerWidth >= 1200 &&
    pageNumber !== 1
  )
    prevMultipleRenders = true;

  const prevRenderedPages = prevMultipleRenders ? (
    <>
      <div onClick={() => changePage(-1)} className="yaaaaa">
        <Page
          key={renderedPageNumber}
          className="prevPage"
          pageNumber={renderedPageNumber}
        />
      </div>
      <div onClick={() => changePage(1)}>
        <Page
          key={renderedPageNumber + 1}
          className="prevPage"
          pageNumber={renderedPageNumber + 1}
        />
      </div>
    </>
  ) : (
    <div onClick={() => changePage(1)}>
      <Page
        key={renderedPageNumber}
        className="prevPage"
        pageNumber={renderedPageNumber}
      // width={400}
      />
    </div>
  );

  const pages =
    pageNumber === 1 || pageNumber === numPages || window.innerWidth < 1200 ? (
      <Page
        key={pageNumber}
        pageNumber={pageNumber}
        onRenderSuccess={() => setRenderedPageNumber(pageNumber)}
      />
    ) : window.innerWidth >= 1200 ? (
      <>
        <Page
          key={pageNumber}
          pageNumber={pageNumber}
          onRenderSuccess={() => setRenderedPageNumber(pageNumber)}
        />
        <Page key={pageNumber + 1} pageNumber={pageNumber + 1} />
      </>
    ) : null;

  return (
    <FullScreen handle={handle}>
      <div className="pdfViewer">
        <div className="pdfV">
          {arrowShowWidth >= 700 && (
            <FontAwesomeIcon
              icon={faArrowLeft}
              size="2x"
              color={arrowLeftColor}
              onClick={previousPage}
              onMouseEnter={() => setArrowLeftColor('#faa50a')}
              onMouseLeave={handleLeftArrowColor}
            />
          )}
          <div className={pdfCanvaSizeDynamic}>
            <Document
              file={props.pdf}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={error =>
                alert('Error while loading document! ' + error.message)
              }
              options={{
                cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
                cMapPacked: true,
              }}
            >
              {isLoading && renderedPageNumber && prevRenderedPages}
              {pages}
            </Document>
          </div>
          {arrowShowWidth >= 700 && (
            <div>
              <FontAwesomeIcon
                icon={faArrowRight}
                size="2x"
                color={arrowRightColor}
                onClick={nextPage}
                onMouseEnter={() => setArrowRightColor('#faa50a')}
                onMouseLeave={handleRightArrowColor}
              />
            </div>
          )}
        </div>

        {arrowShowWidth < 700 && (
          <div className="pt-1">
            <FontAwesomeIcon
              icon={faArrowLeft}
              size="2x"
              color={arrowLeftColor}
              onClick={previousPage}
              onMouseEnter={() => setArrowLeftColor('#faa50a')}
              onMouseLeave={handleLeftArrowColor}
            />
            <FontAwesomeIcon
              icon={faArrowRight}
              size="2x"
              color={arrowRightColor}
              onClick={nextPage}
              onMouseEnter={() => setArrowRightColor('#faa50a')}
              onMouseLeave={handleRightArrowColor}
            />
          </div>
        )}
        <div className="IconsPDFBottom">
          {arrowShowWidth >= 700 && (
            <span className="zoomIcon">
              <FontAwesomeIcon
                icon={zoomIcon}
                size="2x"
                color={zoomIconColor}
                onClick={HandleZoom}
                onMouseEnter={() => setZoomIconColor('#faa50a')}
                onMouseLeave={() => setZoomIconColor('white')}
              />
            </span>
          )}
          <p>
            Página {pageNumber || (numPages ? 1 : '--')}
            {pageNumber > 1 &&
              pageNumber < numPages &&
              window.innerWidth >= 1200 &&
              ` e ${pageNumber + 1}`}{' '}
            de {numPages || '--'}
          </p>
          {arrowShowWidth >= 700 && (
            <span className="expandIcon">
              {fullscreen === false && (
                <FontAwesomeIcon
                  icon={faExpand}
                  size="2x"
                  color={fullscreenIcon}
                  onClick={handleEnterFullscreen}
                  onMouseEnter={() => setFullscreenIcon('#faa50a')}
                  onMouseLeave={() => setFullscreenIcon('white')}
                />
              )}
              {fullscreen === true && (
                <FontAwesomeIcon
                  icon={faCompress}
                  size="2x"
                  color={fullscreenIcon}
                  onClick={handleExitFullscreen}
                  onMouseEnter={() => setFullscreenIcon('#faa50a')}
                  onMouseLeave={() => setFullscreenIcon('white')}
                />
              )}
            </span>
          )}
        </div>
      </div>
    </FullScreen>
  );
}
