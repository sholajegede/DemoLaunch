// @ts-nocheck
import React, { FC, useContext, useCallback } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "containers/Onboard/Login";
import { Link } from "react-router-dom";

//Quill
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./style.css";

export interface BookingContractProps {
  className?: string;
}

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

const BookingContract: FC<BookingContractProps> = ({ className = "" }) => {

  const { influencer } = useContext(InfluencerAuthContext);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const quill = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    const delta = [
        { insert: `Booking Contract for: ${influencer.username}.\n`, attributes: { bold: true, header: 1, align: "center", upper: true } },
        { insert: "This is an italic text.\n", attributes: { italic: true } },
        { insert: "This is an underlined text.\n", attributes: { underline: true } },
        { insert: "This is a strikethrough text.\n", attributes: { strike: true } },
        { insert: "This is a red-colored text.\n", attributes: { color: "red" } },
        { insert: "This is a blue-colored text.\n", attributes: { color: "blue" } },
        { insert: "This is a heading text.", attributes: { header: 1, upper: true } },
    ];

    quill.setContents(delta);
  }, []);

  return (
    <div>
      {influencer ? (
        <div
          className={`nc-BookingContract ${className}`}
          data-nc-id="BookingContract"
        >
          <Helmet>
            <title>Booking Contract</title>
          </Helmet>
          <div className="container">
            <div className="max-w-4xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
              {/* HEADING */}
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Booking contract
                </h2>
                <span className="block mt-3 text-sm xl:text-lg lg:text-lg md:text-sm text-neutral-500 dark:text-neutral-400">
                  You can edit this contract or upload your own.
                </span>
              </div>
              <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

              <div id="container" className="" ref={wrapperRef}></div>
         

              <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

              <div>
                <div className="mt-10 space-y-5 md:mt-0 sm:space-y-6 md:sm:space-y-8">
                  {/* ---- */}
                  <div className="flex flex-col mt-8 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <ButtonPrimary
                      className="flex-1"
                      type="button"
                    >
                      Update contract
                    </ButtonPrimary>
                    <Link
                      to={`/edit-profile/${influencer._id}`}
                      className="relative inline-flex items-center justify-center flex-1 h-auto px-4 py-3 text-sm font-medium transition-colors bg-white border rounded-full disabled:bg-opacity-70 sm:text-base sm:px-6 border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      Back
                    </Link>
                    <ToastContainer className="text-sm" />
                  </div>
                </div>
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

export default BookingContract;