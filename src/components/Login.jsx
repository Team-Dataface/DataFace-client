import logo from "../assets/dataface_logo.png";
import googleLogo from "../assets/google_logo.png";

function Login() {
  return (
    <div className="flex flex-col justify-center items-center p-20">
      <img src={logo} alt="logo" className="w-[30rem]" />
      <h1 className="flex justify-center items-center w-full mb-20 text-[3rem]">
        Your Data, Your Way
      </h1>
      <div className="flex items-center w-[250px] h-[55px] p-1 rounded-[5px] bg-google-blue drop-shadow-md">
        <div className="flex justify-center items-center w-[48px] h-[48px] p-15 rounded-[5px] bg-white ">
          <img
            className="w-[18px] h-[18px]"
            src={googleLogo}
            alt="google-login"
          />
        </div>
        <span className="ml-5 text-white ">Sign in with Google</span>
      </div>
    </div>
  );
}

export default Login;
