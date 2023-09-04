import mongoose from "mongoose";
const { Schema } = mongoose;

const ProposalSchema = new Schema(
  {
    influencerId: {
      type: String,
      required: true,
    },
    brandId: {
      type: String,
      required: false,
    },
    influencerEmail: {
      type: String,
      required: true,
    },
    brandEmail: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    creatorImg: {
      type: String,
      required: true,
    },
    brandLogo: {
      type: String,
      required: false,
    },
    businessName: {
      type: String,
      required: true,
    },
    q1: {
      type: String,
      required: false,
    },
    q2: {
      type: String,
      required: false,
    },
    q3: {
      type: String,
      required: false,
    },
    q4: {
      type: String,
      required: false,
    },
    q5: {
      type: String,
      required: false,
    },
    q6: {
      type: String,
      required: false,
    },
    q7: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    update: {
      type: Boolean,
    },
    updateDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Proposal", ProposalSchema);