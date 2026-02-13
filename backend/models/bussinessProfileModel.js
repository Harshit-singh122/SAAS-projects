// ...existing code...
import mongoose from "mongoose";

const businessProfileSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
        index: true
    },
    businessName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        default: "",
    },
    address: {
        type: String,
        default: " "
    },
    phone: {
        type: String,
        default: " "
    },
    gstNumber: {
        type: String,
        default: " "
    },
    notes: {
    type: String,
    default: ""
    },

    //for image
    logoUrl: {
        type: String,
        required: false,
        default: ""
    },
    stampUrl: {
        type: String,
        required: false,
        default: ""
    },
    signatureUrl: {
        type: String,
        required: false,
        default: ""
    },

    signatureOwnerName: {
        type: String,
        required: false,
        default: ""
    },
    signatureOwnerTitle: {
        type: String,
        required: false,
        default: ""
    },

    // renamed to defaultTaxPercent to match controllers
    defaultTaxPercent: {
        type: Number,
        required: false,
        default: 18
    },

}, { 
    timestamps: true 
});

const BusinessProfile = mongoose.model('BusinessProfile', businessProfileSchema);

export default BusinessProfile;
// ...existing code...