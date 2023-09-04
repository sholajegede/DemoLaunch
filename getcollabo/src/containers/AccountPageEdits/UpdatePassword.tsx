// @ts-nocheck
import React, { FC, useState, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import { Helmet } from "react-helmet";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import newRequest from "utils/newRequest";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "containers/Onboard/Login";
import { Link } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";

export interface UpdatePasswordProps {
  className?: string;
}

const UpdatePassword: FC<UpdatePasswordProps> = ({ className = "" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState({
    password: undefined,
    confirmPassword: undefined,
  });
  const [error, setError] = useState(null);

  const { dispatch: authDispatch, influencer } = useContext(
    InfluencerAuthContext
  ); // rename dispatch to authDispatch

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    setNewPassword((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    authDispatch({ type: "UPDATE_START" });

    try {
      const sendPassword = {
        ...newPassword,
      };
      const changePassword = await newRequest.post(
        `/auth-influencer/reset-password/${influencer._id}`,
        sendPassword
      );
      authDispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      console.log(changePassword.status);
      setLoading(false);
      toast.success("👍 Password updated successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      history.push("/successful");
    } catch (error) {
      authDispatch({
        type: "UPDATE_FAILURE",
        payload: error.response.data,
      });
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

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      {influencer ? (
        <div
          className={`nc-UpdatePassword ${className}`}
          data-nc-id="UpdatePassword"
        >
          <Helmet>
            <title>Password Update</title>
          </Helmet>
            <div className="pt-20 pb-24 mt-4 lg:pt-20">
              {/* HEADING */}
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Update Password
                </h2>
                <span className="block mt-4 mb-2 text-sm xl:text-lg lg:text-lg md:text-sm text-neutral-500 dark:text-neutral-400">
                  To update your password, please enter your new password in the
                  first box and confirm it by entering it again in the second
                  box.
                </span>
              </div>
              <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
              <div className="mt-6 space-y-5 sm:space-y-6 md:sm:space-y-8">
                {/* FORM */}
                <div
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handlePasswordReset(e);
                    }
                  }}
                >
                  <form className="grid grid-cols-1 gap-4">
                    <label className="block">
                      <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                        New Password
                      </span>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          className="mt-1"
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
                    </label>

                    <label className="block">
                      <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                        Confirm Password
                      </span>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          id="confirmPassword"
                          className="mt-1"
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
                    </label>

                    <div className="">
                      <div className="flex flex-col mt-8 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                        <ButtonPrimary
                          className="flex-1"
                          disabled={loading}
                          type="button"
                          onClick={handlePasswordReset}
                        >
                          {loading
                            ? "Resetting your password..."
                            : "Reset password"}
                        </ButtonPrimary>
                        <Link
                          to={"/settings"}
                          className="relative inline-flex items-center justify-center flex-1 h-auto px-4 py-3 text-sm font-medium transition-colors bg-white border rounded-full disabled:bg-opacity-70 sm:text-base sm:px-6 border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          Back
                        </Link>
                        <ToastContainer className="text-sm" />
                      </div>

                      {loading && (
                        <div className="flex items-center mt-2">
                          <div className="w-5 h-5 border-b-2 rounded-full border-primary-6000 animate-spin"></div>
                          <span className="ml-2 text-sm">
                            Updating your awesome profile...give us a few
                            seconds.
                          </span>
                        </div>
                      )}

                      {error && (
                        <p className="text-sm text-center text-red-500">
                          {error}
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default UpdatePassword;