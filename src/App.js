import {useState, useCallback, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const countTotal = (num) => {
    console.log('counting...');
    return num + 10;
}

const Slider = (props) => {

    const [slide, setSlide] = useState(0);

    function changeSlide(i) {
        setSlide(slide => slide + i);
    }

    const [autoplay, setAutoplay] = useState(false);

    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay)
    }

    const getSomeImages  = useCallback( () => {
        // console.log('fetching');
        return [
            'https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/rolls_royce_phantom_top_10.jpg?itok=XjL9f1tx',
            'https://www.supercars.net/blog/wp-content/uploads/2022/09/Best-New-Sports-and-Performance-Cars-2022_Chevrolet_Corvette.jpg'
        ]
    }, [slide] );

    const total = countTotal(slide);

    return (
        <Container>
            <div className="slider w-50 m-auto">

                <Slide getSomeImages={getSomeImages}/>

                <div className="text-center mt-5">Active slide {slide} <br/>
                    {autoplay ? 'auto' : null}
                </div>
                <div className="text-center mt-5">Total slides: {total}</div>
                <div className="buttons mt-3">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ( {getSomeImages} ) => {
    const [images, setImages] = useState([]);

    useEffect( () => {
        setImages(getSomeImages())
    }, [getSomeImages] )

    return (
        <>
            {images.map( (url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" /> )}
        </>
    )
}

function App() {
    const [slider, setSlider] = useState(true);


  return (
    <>
        <button onClick={() => setSlider(false)}>Click</button>
        {slider ? <Slider/> : null}
    </>
  );
}

export default App;


