import React, { useState, useContext } from 'react';
import './Login.css';
import './util.css';
import iconGoogle from '../../Assets/icons/icon-google.png';
import iconDiscord from '../../Assets/icons/icon-discord.png';
import RegisterForm from './Register';
import { UserContext } from '../Context/UserContext';
import GoogleLogin from 'react-google-login';
import { postLogin } from '../../ApiRequest/apiDash';

export const googleOauthItem = {
	clientId: "706205390650-gef5ro9ommeh78kk4v3qm8bej83j4lkk.apps.googleusercontent.com",
};

const ExtLogin = (props: any) => (
	<button onClick={props.onClick} className={props.className + ' button-link'}>
		<img src={props.icon} alt="icon" />
		{props.serviceName}
	</button>
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

const LoginButton = (props: any) => (
	<div className="container-form-btn m-t-17">
		<button onClick={props.handleSubmit} className="form-btn">
			Sign In
		</button>
	</div>
);

const RegisterLink = (props: any) => (
	<div className="w-full text-center p-t-55">
		<span className="txt2">
			Not a member?
		</span>
		<button onClick={() => { props.setIsLogin(false); }} className="txt2 bo1 button-link">
			Sign up now
		</button>
	</div>
);

const LoginForm = (props: any) => {

	const responseGoogle = (response: any) => {
		postLogin(response.profileObj.name, response.profileObj.googleId, true)
		.then(res => {
			props.setToken(res.jwt);
			props.setUsername(res.user.username);
			localStorage.setItem('token', res.jwt);
			localStorage.setItem('username', res.user.username);
		})
		.catch(console.error)
	}

	return (
		<div>
			<span className="login100-form-title p-b-53">
				Sign In With
			</span>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<ExtLogin serviceName="Discord" className="btn-discord m-b-20" icon={iconDiscord} />
				<GoogleLogin
					clientId={googleOauthItem.clientId}
					render={renderProps => (
						<ExtLogin onClick={renderProps.onClick} serviceName="Google" className="btn-google m-b-20" icon={iconGoogle} />
					)
					}
					buttonText="Login"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={'single_host_origin'}
				/>
			</div>
			<form className="login100-form validate-form flex-sb flex-w" onSubmit={props.handleSubmit}>

				<FormInput title="Username" data_validate="Username is required" type="text" name="user" value={props.user} onChange={(e: any) => { props.setUser(e.target.value) }} />
				<FormInput title="Password" data_validate="Password is required" type="password" name="password" value={props.password} onChange={(e: any) => { props.setPassword(e.target.value) }} />
				<LoginButton props={props.handleSubmit} />
				<RegisterLink setIsLogin={props.setIsLogin} />
			</form>
		</div>
	);
}

export default function Login() {
	const [isLogin, setIsLogin] = useState(true);
	const { setUsername, setToken } = useContext(UserContext);
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: any) => {
		e.preventDefault();
		postLogin(user, password, false)
			.then(res => {
				setToken(res.jwt);
				setUsername(res.user.username);
				localStorage.setItem('token', res.jwt);
				localStorage.setItem('username', res.user.username);
			})
			.catch(console.error)
	}

	return (
		<div className="limiter">
			<div className="container-login100">
				<div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
					{isLogin ? <LoginForm user={user} setUser={setUser} password={password} setPassword={setPassword} setIsLogin={setIsLogin} handleSubmit={handleSubmit} setToken={setToken} setUsername={setUsername}/>
						: <RegisterForm setIsLogin={setIsLogin} />}
				</div>
			</div>
		</div>
	);
}

// https://colorlib.com/etc/lf/Login_v5/index.html#
// https://colorlib.com/wp/template/login-form-v5/