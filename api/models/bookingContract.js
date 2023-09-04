import mongoose from "mongoose";
const { Schema } = mongoose;

const BookingContractSchema = new Schema(
  {
    influencerId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    docRef: {
      type: String,
      required: true,
    },
    emails: {
      type: [String],
      required: true,
    },
    xfdf: {
      type: [Object], // You might need to adjust the schema according to your XFDF data structure
      required: false,
    },
    signedBy: {
      type: [String],
      required: false,
    },
    signed: {
      type: Boolean,
      default: false,
      required: true,
    },
    requestedTime: {
      type: Date,
      required: true,
    },
    signedTime: {
      type: Date,
      default: null,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BookingContract", BookingContractSchema);
