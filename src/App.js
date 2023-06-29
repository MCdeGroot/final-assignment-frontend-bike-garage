import './App.css';

function App() {
    function logClick(){
        console.log('You clicked!');
    }

    return (
        <>
            <h1>Hello Welcome to BikeGarage</h1>
            <button type="button" onClick={logClick}> klik hier </button>
        </>
    );
}

export default App;
