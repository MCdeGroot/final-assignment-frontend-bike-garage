import React from "react";
import '../../App.css'
import Button from '../../components/button/Button'
import addIcon from '../../assets/add.svg';
import {ChatText} from "@phosphor-icons/react";

function Login() {
    function onClick(){
        console.log('You clicked!');
    }

    return (
        <>
            <main className='outer-container'>
                <div className='inner-container'>
                    <section>
                        <h1>Hier is de login pagina</h1>


                        <Button
                            type="submit"
                            className='signin-button'
                        onClick={onClick}>
                            Log in
                        </Button>
                        <Button type="button" className='add-button'>
                            <img src={addIcon} alt="Add Gear"/>
                        </Button>
                        <Button type="button">
                            <ChatText color="#FBF8F5" />
                        </Button>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Login;

