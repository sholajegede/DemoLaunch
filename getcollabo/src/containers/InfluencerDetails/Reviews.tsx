
import React, { FC, useState, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Textarea from "shared/Textarea/Textarea";
import Review from "./Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "utils/newRequest";
import { InfluencerData } from "routers/types";
import { AuthContext } from "context/AuthContext";

export interface ReviewInput {
  influencerId: number;
  brandId: number;
  desc: string;
  star: number;
}

export interface ReviewsPageProps {
  className?: string;
  reviewsProp?: InfluencerData;
}

const Reviews: FC<ReviewsPageProps> = ({
  className = "",
  reviewsProp,
}) => {
  const { brand } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState("");
  const [reviewDesc, setReviewDesc] = useState("");
  const [reviewStar, setReviewStar] = useState("");
  const influencerId = reviewsProp ? reviewsProp._id : null;
  const brandId = brand ? brand._id : null;

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", influencerId],
    queryFn: () =>
      newRequest.get(`/reviews/${influencerId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation(
    (review: ReviewInput) => newRequest.post('/reviews', review),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["reviews", influencerId]);
      },
      onError: (error: { response: { data: string } }) => {
        setErrorMessage(error.response.data);
      }
    }
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const desc = e.target[0].value;
      const star = e.target[1].value;
      if (influencerId) {
        mutation.mutate({ influencerId, brandId, desc, star });
        setReviewDesc("");
        setReviewStar("");
      }
    },
    [reviewDesc, reviewStar, influencerId, brandId, mutation]
  );


  return (
    <div className="w-full pdx-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex justify-start pd-1 space-x-2.5 rounded-full border-neutral-300 dark:border-neutral-500">
          <Tab
            className={({ selected }) =>
              `px-3.5 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-sm leading-5 font-medium rounded-xl focus:outline-none focus:ring-2 ring-primary-300 ${
                selected
                  ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                  : "text-neutral-700 dark:text-neutral-300 bg-neutral-100/70 dark:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
              }`
            }
          >
            Reviews
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-10">
          <Tab.Panel
            className={
              "rounded-xl focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 "
            }
          >
            {isLoading ? (
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary-6000" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : error ? (
              <div>Something went wrong!</div>
            ) : (
              data.map((review) => <Review key={review._id} review={review} />)
            )}
          </Tab.Panel>
        </Tab.Panels>

        <hr className="mt-10 mb-3" />
        {brand ? (
          <form action="" className="write" onSubmit={handleSubmit}>
          <Textarea placeholder="Type a review..." value={reviewDesc} onChange={(e) => setReviewDesc(e.target.value)} />
          <select name="" id="" className="mt-2 bg-gray-50 border border-neutral-200 text-gray-900 text-sm rounded-xl focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:border-primary-300 block w-full p-2.5 dark:bg-gray-700 dark:border-neutral-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25" value={reviewStar} onChange={(e) => setReviewStar(e.target.value)}>
            <option value="">Choose number of stars</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <div className="mt-3 space-x-3">
            <ButtonPrimary type="submit" sizeClass="px-4 py-2 sm:px-5">Post review</ButtonPrimary>
          </div>
          {errorMessage && <p className="mt-2 text-sm">{errorMessage}</p>}
        </form>
        ) : (
          <p className="text-sm">You need to have a brand account to drop a review. <Link to="/create-brand"><span className="font-medium text-primary-6000">Signup for free</span>.</Link></p>
        )}
      </Tab.Group>
    </div>
  );
};

export default Reviews;
