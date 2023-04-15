import React, { useState } from 'react';
import iconGoogle from '../../Assets/icons/icon-google.png';
import iconDiscord from '../../Assets/icons/icon-discord.png';
import GoogleLogin from 'react-google-login';
import { googleOauthItem } from './Login';

import { postRegister } from '../../ApiRequest/apiDash';

const ExtRegister = (props: any) => (
    <button onClick={props.onClick} className={props.className + ' button-link'}>
        <img src={props.icon} alt="icon"/>
        {props.serviceName}
    </button>
);

const LoginLink = (props: any) => (
    <div className="w-full text-center p-t-55">
        <span className="txt2">
            Already an account ?
        </span>
        <button onClick={() => { props.setIsLogin(true); }} className="txt2 bo1 button-link">
            Sign in now
        </button>
    </div>
);

const FormInput = (props: any) => (
    <>
        <div className="p-t-31 p-b-9">
            <span className="txt1">
                {props.title}
            </span>
        </div>
        <div className="wrap-input100 validate-input" data-validate={props.data_validate} >
            <input className="input100" type={props.type} name={props.name} value={props.value} onChange={props.onChange} required autoComplete='' />
            <span className="focus-input100"></span>
        </div>
    </>
);

const RegisterButton = (props: any) => (
    <div className="container-form-btn m-t-17">
        <button onClick={props.handleSubmit} className="form-btn">
            Sign Up
        </button>
    </div>
);

const RegisterForm = (props: any) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!postRegister(user, password, false).catch(console.error))
            return;
        props.setIsLogin(true);
    };

    const responseGoogle = (response: any) => {
        if (!postRegister(response.profileObj.name, response.profileObj.googleId, true).catch(console.error))
            return;
        props.setIsLogin(true);
    }

    return (
        <div>
            <span className="login100-form-title p-b-53">
                Sign Up With
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ExtRegister serviceName="Discord" className="btn-discord m-b-20" icon={iconDiscord} />
                <GoogleLogin
                    clientId={googleOauthItem.clientId}
                    render={renderProps => (
                        <ExtRegister onClick={renderProps.onClick} serviceName="Google" className="btn-google m-b-20" icon={iconGoogle} />
                    )
                    }
                    buttonText="Sign up"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
            <form className="login100-form validate-form flex-sb flex-w" onSubmit={handleSubmit}>
                <FormInput title="Username" data_validate="Username is required" type="text" name="user" value={props.user} onChange={(e: any) => { setUser(e.target.value) }} />
                <FormInput title="Password" data_validate="Password is required" type="password" name="password" value={props.password} onChange={(e: any) => { setPassword(e.target.value) }} />

                <RegisterButton handleSubmit={handleSubmit} />
                <LoginLink setIsLogin={props.setIsLogin} />
            </form>
        </div>
    );
}

export default RegisterForm;