import mongoose from "mongoose";
const { Schema } = mongoose;

const InvoiceSchema = new Schema(
  {
    influencerId: {
      type: String,
      required: true,
    },
    influencerUsername: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    brandEmail: {
      type: String,
      required: true,
    },
    influencerEmail: {
      type: String,
      required: true,
    },
    influencerImg: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    paperId: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Invoice", InvoiceSchema);
