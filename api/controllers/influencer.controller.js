import Influencer from "../models/influencer.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";

export const deleteInfluencer = async (req, res, next) => {
  const influencer = await Influencer.findById(req.params.id);

  if (req.influencerId !== influencer._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await Influencer.findByIdAndDelete(req.params.id);
  res.status(200).send("Your influencer account has been deleted!");
};

export const getInfluencer = async (req, res, next) => {
  try {
    const influencer = await Influencer.findById(req.params.id);
    res.status(200).json(influencer);
  } catch (error) {
    next(error);
  }
};

export const getInfluencerByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;

    const influencer = await Influencer.findOne({ username });
    if (!influencer) {
      return res.status(404).json({ message: 'Influencer not found' });
    }

    res.status(200).json(influencer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving influencer data' });
  }
};

export const getDeliverableById = async (req, res, next) => {
  try {
    const influencer = await Influencer.findOne({
      username: req.params.username,
    });
    const deliverableId = req.params.deliverableId;
    const deliverable = influencer.deliverable.id(deliverableId);
    if (!deliverable) {
      return res.status(404).json({ message: "Deliverable not found" });
    }
    res.status(200).json(deliverable);
  } catch (error) {
    next(error);
  }
};

export const getVideoSampleById = async (req, res, next) => {
  try {
    const influencer = await Influencer.findOne({
      username: req.params.username,
    });
    const videoSampleId = req.params.videoSampleId;
    const sample = influencer.videoSample.id(videoSampleId);
    if (!sample) {
      return res.status(404).json({ message: "Sample not found" });
    }
    res.status(200).json(sample);
  } catch (error) {
    next(error);
  }
};

export const getDatatableById = async (req, res, next) => {
  try {
    const influencer = await Influencer.findOne({ username: req.params.username });
    if (!influencer) {
      return res.status(404).json({ message: "Influencer not found" });
    }

    const indexId = req.params.indexId;

    const datatable = influencer.datatable.find((data) => data._id == indexId);
    if (!datatable) {
      return res.status(404).json({ message: "Deliverable not found" });
    }

    res.status(200).json(datatable);
  } catch (error) {
    next(error);
  }
};

export const getInfluencerByEmail = async (req, res, next) => {
  try {
    const influencer = await Influencer.findOne({
      email: req.params.email,
    });
    res.status(200).json(influencer);
  } catch (error) {
    next(error);
  }
};

export const getAllInfluencerAccounts = async (req, res, next) => {
  try {
    const allInfluencers = await Influencer.find(req.params.id);
    res.status(200).json(allInfluencers);
  } catch (error) {
    next(error);
  }
};

export const updateBankInfo = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const { bankAccountName, bankAccountNumber, bank } = req.body;
    const updates = {};

    if (bankAccountName) {
      updates.bankAccountName = bankAccountName;
    }

    if (bankAccountNumber) {
      updates.bankAccountNumber = bankAccountNumber;
    }

    if (bank) {
      updates.bank = bank;
    }

    const options = { new: true };
    const updateQuery = { $set: updates };
    const updatedBankInfo = await Influencer.findByIdAndUpdate(
      influencerId,
      updateQuery,
      options
    );
    res.status(200).json(updatedBankInfo);
  } catch (error) {
    next(error);
  }
};

export const updateInfluencer = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const updates = req.body;

    const influencer = await Influencer.findById(influencerId);

    if (updates.password) {
      // if password is being updated, hash it
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(updates.password, salt);
      updates.password = hash;
    }

    if (updates.username) {
      updates.username = updates.username.toLowerCase();
    }
    const displayNameExists = await Influencer.findOne({ displayName: updates.displayName });
    if (displayNameExists) {
      return res.status(400).json({ error: 'This display name already exists' });
    }
    const usernameExists = await Influencer.findOne({ username: updates.username });
    if (usernameExists) {
      return res.status(400).json({ error: 'This username already exists' });
    }

    const options = { new: true }; // return the updated document
    const updateQuery = { $set: { ...updates} };
    const updatedInfluencer = await Influencer.findByIdAndUpdate(
      influencerId,
      updateQuery,
      options
    );
    res.status(200).json(updatedInfluencer);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateInfluencerDeliverables = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const updates = req.body;

    const influencer = await Influencer.findById(influencerId);
    const existingDeliverables = influencer.deliverable;

    const updatedDeliverables = updates.deliverable ? [...existingDeliverables, ...updates.deliverable] : existingDeliverables;

    if (!updatedDeliverables || !updatedDeliverables.length) {
      return res.status(400).json({ error: 'Click on the "Add new deliverable" button to add a new Deliverable. Then Click on "Update deliverables" to complete.' });
    }
    const invalidDeliverables = updatedDeliverables.filter((deliverable) => {
      return !deliverable.description || !deliverable.rate || !deliverable.deliveryTime;
    });
    if (invalidDeliverables.length) {
      return res.status(400).json({ error: 'One or more deliverables are incomplete. Check to confirm if you have added the "Description", "Rate", and "Delivery time" correctly.' });
    }

    const options = { new: true }; // return the updated document
    const updateQuery = { $set: { ...updates, deliverable: updatedDeliverables } }; // merge existing deliverables with updates
    const updatedInfluencer = await Influencer.findByIdAndUpdate(
      influencerId,
      updateQuery,
      options
    );
    res.status(200).json(updatedInfluencer);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateInfluencerVideoSample = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const updates = req.body;

    const influencer = await Influencer.findById(influencerId);
    const existingVideoSamples = influencer.videoSample;


    const updatedVideoSamples = updates.videoSample ? [...existingVideoSamples, ...updates.videoSample] : existingVideoSamples;

    if (!updatedVideoSamples || !updatedVideoSamples.length) {
      return res.status(400).json({ error: 'Click on the "Click to add new video" button to add a new video. Then Click on "Update sample videos" to complete.' });
    }
    const invalidVideoSamples = updatedVideoSamples.filter((videoSample) => {
      return !videoSample.video && !videoSample.title;
    });
    if (invalidVideoSamples.length) {
      return res.status(400).json({ error: 'One or more video sample are incomplete. Check to confirm if you have added the "Video link", and "Title" correctly.' });
    }

    const options = { new: true }; // return the updated document
    const updateQuery = { $set: { ...updates, videoSample: updatedVideoSamples } };
    const updatedInfluencer = await Influencer.findByIdAndUpdate(
      influencerId,
      updateQuery,
      options
    );
    res.status(200).json(updatedInfluencer);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteDeliverable = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const deliverableId = req.params.deliverableId;

    const influencer = await Influencer.findById(influencerId);
    const updatedDeliverables = influencer.deliverable.filter((d) => d._id.toString() !== deliverableId);

    const options = { new: true }; // return the updated document
    const updateQuery = { $set: { deliverable: updatedDeliverables } }; // update the deliverables array
    const updatedInfluencer = await Influencer.findByIdAndUpdate(
      influencerId,
      updateQuery,
      options
    );

    if (!updatedInfluencer) {
      return res.status(404).json({ error: 'Influencer not found' });
    }

    res.status(200).json(updatedInfluencer);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateDeliverableById = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const deliverableId = req.params.deliverableId;
    const { description, rate, deliveryTime } = req.body;

    // Create an empty update object
    const updateObj = {};

    // Add fields to the update object only if they are provided
    if (description) updateObj["deliverable.$.description"] = description;
    if (rate) updateObj["deliverable.$.rate"] = rate;
    if (deliveryTime) updateObj["deliverable.$.deliveryTime"] = deliveryTime;

    // Perform the update using the $set operator with the update object
    const updatedDeliverable = await Influencer.findOneAndUpdate(
      { _id: influencerId, "deliverable._id": deliverableId },
      { $set: updateObj },
      { new: true }
    );

    if (!updatedDeliverable) {
      return res.status(404).json({
        success: false,
        message: "Deliverable not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deliverable updated successfully",
      deliverable: updatedDeliverable,
    });
  } catch (error) {
    console.error("Error updating deliverable:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update deliverable",
      error: error.message,
    });
  }
};

export const updateVideoSampleById = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const videoSampleId = req.params.videoSampleId;
    const { video, title } = req.body;

    const updateObj = {};

    if (video) updateObj["videoSample.$.video"] = video;
    if (title) updateObj["videoSample.$.title"] = title;

    const updatedVideoSample = await Influencer.findOneAndUpdate(
      { _id: influencerId, "videoSample._id": videoSampleId },
      { $set: updateObj },
      { new: true }
    );

    if (!updatedVideoSample) {
      return res.status(404).json({
        success: false,
        message: "Sample not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sample updated successfully",
      videoSample: updatedVideoSample,
    });
  } catch (error) {
    console.error("Error updating sample:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update sample",
      error: error.message,
    });
  }
};

export const deleteVideoSample = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const videoSampleId = req.params.videoSampleId;

    const influencer = await Influencer.findById(influencerId);
    const updatedVideoSample = influencer.videoSample.filter((d) => d._id.toString() !== videoSampleId);

    const options = { new: true }; // return the updated document
    const updateQuery = { $set: { videoSample: updatedVideoSample } }; // update the videoSample array
    const updatedInfluencer = await Influencer.findByIdAndUpdate(
      influencerId,
      updateQuery,
      options
    );

    if (!updatedInfluencer) {
      return res.status(404).json({ error: 'Influencer not found' });
    }

    res.status(200).json(updatedInfluencer);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const editVideoSampleTitle = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const videoSampleId = req.params.videoSampleId;
    const newTitle = req.body.newTitle; // Get the new title from the request body

    const influencer = await Influencer.findById(influencerId);
    const updatedVideoSample = influencer.videoSample.map((d) => {
      if (d._id.toString() === videoSampleId) {
        // If the videoSample ID matches, update the title
        return { ...d, title: newTitle };
      }
      return d;
    });

    const options = { new: true }; // return the updated document
    const updateQuery = { $set: { videoSample: updatedVideoSample } }; // update the videoSample array
    const updatedInfluencer = await Influencer.findByIdAndUpdate(
      influencerId,
      updateQuery,
      options
    );

    if (!updatedInfluencer) {
      return res.status(404).json({ error: 'Influencer not found' });
    }

    res.status(200).json(updatedInfluencer);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getInfluencerProfiles = async (req, res, next) => {
  const q = req.query;
  const filters = {};

  if (q.influencerId) {
    filters.influencerId = q.influencerId;
  }

  if (q.industry) {
    filters.industry = q.industry;
  }

  if (q.min && q.max) {
    filters["deliverable.0.rate"] = {
      $gte: q.min,
      $lte: q.max,
    };
  } else if (q.min) {
    filters["deliverable.0.rate"] = {
      $gte: q.min,
    };
  } else if (q.max) {
    filters["deliverable.0.rate"] = {
      $lte: q.max,
    };
  }

  if (q.search) {
    filters.username = { $regex: q.search, $options: "i" };
  }

  try {
    let getInfluencerProfiles;
    if (q.sort) {
      getInfluencerProfiles = await Influencer.find(filters).sort({
        [q.sort]: -1,
      });
    } else {
      getInfluencerProfiles = await Influencer.find(filters);
    }
    res.status(200).send(getInfluencerProfiles);
  } catch (err) {
    next(err);
  }
};

export const getByBookingRate = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const byRates = await Influencer.find({
      ...others,
      "deliverable.0.rate": { $gt: min | 0, $lt: max || 9999999 },
    }).limit(req.query.limit);
    res.status(200).json(byRates);
  } catch (error) {
    next(error);
  }
};

export const getFeatured = async (req, res, next) => {
  const { featured } = req.query;
  try {
    const featuredInfluencers = await Influencer.find({
      isFeatured: featured === true
    }).limit(req.query.limit);
    res.status(200).json(featuredInfluencers);
  } catch (error) {
    next(error);
  }
};

export const countByIndustry = async (req, res, next) => {
  try {
    const artCount = await Influencer.countDocuments({ industry: "art" });
    const beautyCount = await Influencer.countDocuments({ industry: "beauty" });
    const blockchainCount = await Influencer.countDocuments({
      industry: "blockchain",
    });
    const businessCount = await Influencer.countDocuments({
      industry: "business",
    });
    const danceCount = await Influencer.countDocuments({ industry: "dance" });
    const fashionCount = await Influencer.countDocuments({
      industry: "fashion",
    });
    const financeCount = await Influencer.countDocuments({
      industry: "finance",
    });
    const foodCount = await Influencer.countDocuments({ industry: "food" });
    const gamingCount = await Influencer.countDocuments({ industry: "gaming" });
    const healthCount = await Influencer.countDocuments({ industry: "health" });
    const lifestyleCount = await Influencer.countDocuments({
      industry: "lifestyle",
    });
    const photographyCount = await Influencer.countDocuments({
      industry: "photography",
    });
    const realEstateCount = await Influencer.countDocuments({
      industry: "real estate",
    });
    const skitsCount = await Influencer.countDocuments({
      industry: "skits",
    });
    const storytellingCount = await Influencer.countDocuments({
      industry: "storytelling",
    });
    const sportsCount = await Influencer.countDocuments({ industry: "sports" });
    const techCount = await Influencer.countDocuments({ industry: "tech" });
    const travelCount = await Influencer.countDocuments({ industry: "travel" });

    res.status(200).json([
      { industry: "art", count: artCount },
      { industry: "beauty", count: beautyCount },
      { industry: "blockchain", count: blockchainCount },
      { industry: "business", count: businessCount },
      { industry: "dance", count: danceCount },
      { industry: "fashion", count: fashionCount },
      { industry: "finance", count: financeCount },
      { industry: "food", count: foodCount },
      { industry: "gaming", count: gamingCount },
      { industry: "health", count: healthCount },
      { industry: "lifestyle", count: lifestyleCount },
      { industry: "photography", count: photographyCount },
      { industry: "real estate", count: realEstateCount },
      { industry: "skits", count: skitsCount },
      { industry: "storytelling", count: storytellingCount },
      { industry: "sports", count: sportsCount },
      { industry: "tech", count: techCount },
      { industry: "travel", count: travelCount },
    ]);
  } catch (error) {
    next(error);
  }
};