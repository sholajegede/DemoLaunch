export const INITIAL_STATE = {
    influencer: JSON.parse(localStorage.getItem("influencer"))?._id,
    videoSample: [],
};

export const videoSampleReducer = (state, action) => {
    switch (action.type) {
        case "ADD_VIDEO_SAMPLE":
            return {
                ...state,
                videoSample: [...state.videoSample, action.payload],
            };
        case "REMOVE_VIDEO_SAMPLE":
            return {
                ...state,
                videoSample: state.videoSample.filter(
                (videoSample) => videoSample._id !== action.payload
                ),
            };
        case "REMOVE_ALL_VIDEO_SAMPLES":
            return {
                ...state,
                videoSample: []
            };
        default:
            return state;
    };
};