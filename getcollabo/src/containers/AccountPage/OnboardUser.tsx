// @ts-nocheck
import React, { FC, useState, useContext, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import { Helmet } from "react-helmet";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import newRequest from "utils/newRequest";
import FormItem from "components/FormItem";
import { Link, useHistory, useParams } from "react-router-dom";
import Label from "components/Label/Label";
import { AuthContext } from "context/AuthContext";
import { BiShow, BiHide } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckboxTerms from "shared/Checkbox/CheckboxTerms";
import BrandLogin from "containers/PageLogin/BrandLogin";

export interface OnboardUserProps {
  className?: string;
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

const OnboardUser: FC<OnboardUserProps> = ({ className = "" }) => {
  const { userName } = useParams<{ userName: string }>();

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
    displayName: undefined,
  });

  const params = useParams();

  const [newName, setNewName] = useState();

  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [error, setError] = useState();

  const { dispatch } = useContext(InfluencerAuthContext);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleUsernameChange = (event) => {
    const { value } = event.target;
    setNewName(value);
  };

  useEffect(() => {
    if (userName) {
      setNewName(userName);
    }
  }, [userName]);

  useEffect(() => {
    console.log("termsAndConditions changed:", termsAndConditions);
  }, [termsAndConditions]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "SIGNUP_START" });

    try {
      const newInfluencer = {
        ...credentials,
        username: userName || newName,
        termsAndConditionsAccepted: termsAndConditions,
      };

      const res = await newRequest.post(
        "/auth-influencer/register",
        newInfluencer
      );
      dispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
      setLoading(false);
      toast.success("👋 Welcome to GetCollabo", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      history.push("/verifyCreator");
    } catch (error) {
      dispatch({ type: "SIGNUP_FAILURE", payload: error.response.data });
      setLoading(false);
      if (error.response) {
        setError(error.response.data.error);
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setError(error.message);
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const { influencer } = useContext(InfluencerAuthContext);
  const { brand } = useContext(AuthContext);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  if (influencer) {
    history.push("/dashboard");
    return null;
  }

  const displayed = userName
    ? userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase()
    : null;

  return (
    <div>
      {brand ? (
        <BrandLogin />
      ) : (
        <div className={`nc-OnboardUser ${className}`} data-nc-id="OnboardUser">
          <Helmet>
            <title>Create Account</title>
          </Helmet>
          <div className="container">
            <div className="max-w-4xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
              {/* HEADING */}
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Hi👋 {displayed}!
                </h2>
                <span className="block mt-3 text-sm xl:text-lg lg:text-lg md:text-sm text-neutral-500 dark:text-neutral-400">
                  Fill in your preferred display name, username, email address
                  and password to get started on GetCollabo.
                </span>
              </div>
              <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
              <div
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSignUp(e);
                  }
                }}
              >
                <form className="mt-10 space-y-5 md:mt-0 sm:space-y-6 md:sm:space-y-8">
                  {/* ---- */}
                  <FormItem label="Display Name">
                    <Input
                      placeholder={`E.g ${displayed} Joe`}
                      id="displayName"
                      onChange={handleChange}
                    />
                  </FormItem>

                  {/* ---- */}
                  <FormItem
                    label="Username"
                    desc={
                      <div>
                        Personalized link: [getcollabo.io/book/
                        <span className="font-bold text-green-500">
                          {newName}
                        </span>
                        ]
                      </div>
                    }
                  >
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                        getcollabo.io/book/
                      </span>
                      <Input
                        id="userName"
                        onChange={handleUsernameChange}
                        className="!rounded-l-none"
                        type="text"
                        placeholder="Enter a new username"
                        value={newName}
                      />
                    </div>
                  </FormItem>

                  {/* ---- */}
                  <div>
                    <Label>Email Address</Label>
                    <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <i className="text-2xl las la-envelope"></i>
                      </span>
                      <Input
                        id="email"
                        className="!rounded-l-none"
                        placeholder={`${userName}@email.com`}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* ---- */}
                  <FormItem label="Password">
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="pr-10 mt-1"
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? <BiShow /> : <BiHide />}
                      </button>
                    </div>
                  </FormItem>

                  <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

                  <CheckboxTerms
                    label
                    checked={termsAndConditions}
                    onChange={(isChecked) => setTermsAndConditions(isChecked)}
                  />

                  {/* ---- */}
                  <div className="flex flex-col items-center justify-center pt-2 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <ButtonPrimary
                      className="w-full mt-3"
                      disabled={loading}
                      type="button"
                      onClick={handleSignUp}
                    >
                      {loading ? "Signing you up" : "Sign Up"}
                    </ButtonPrimary>

                    <ToastContainer className="text-sm" />
                  </div>
                  {loading && (
                    <div className="flex items-center mt-2">
                      <div className="w-5 h-5 border-b-2 rounded-full border-primary-6000 animate-spin"></div>
                      <span className="ml-2 text-sm">{`We're creating your awesome account ${displayed}...`}</span>
                    </div>
                  )}

                  {error && (
                    <p className="text-sm text-center text-red-500">{error}</p>
                  )}
                </form>
              </div>

              {/* ==== */}
              <span className="block text-center xl:text-end md:text-end text-neutral-700 dark:text-neutral-300">
                {displayed}, do you already have an account? If so, please{" "}
                <Link className="text-green-600" to="/login-creator">
                  Login here
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardUser;