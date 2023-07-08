import React, {useContext} from "react";
import '../../App.css'
import './AuthPages.css'
import Button from '../../components/button/Button'
import {useForm} from "react-hook-form";
import FormInputField from "../../components/formInput/FormInputField";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function PasswordChange(){
    const {register, handleSubmit, reset} = useForm();
    const {isAuth} = useContext(AuthContext);



}

export default PasswordChange;