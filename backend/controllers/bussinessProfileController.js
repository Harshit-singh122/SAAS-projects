import path from "path";
import BusinessProfile from "../models/bussinessProfileModel.js";
import { getAuth } from "@clerk/express";

const API_BASE = process.env.API_BASE || "http://localhost:4000";

function uploadedFilesToUrls(req) {
    const urls = {};
    if (!req.files) return urls;
    const mapping = {
        logoName: "logoUrl",
        stampName: "stampUrl",
        signatureNameMeta: "signatureUrl",
        logo: "logoUrl",
        stamp: "stampUrl",
        signature: "signatureUrl",
    };
    Object.keys(mapping).forEach((field) => {
        const arr = req.files[field];
        if (Array.isArray(arr) && arr[0]) {
            const filename = arr[0].filename || (arr[0].path && path.basename(arr[0].path));
            if (filename) urls[mapping[field]] = `${API_BASE}/uploads/${filename}`;
        }
    });
    return urls;
}

export async function createBusinessProfile(req, res) {
    try {
        const { userId } = getAuth(req) || {};
        if (!userId) return res.status(401).json({ success: false, message: "Auth required" });

        const body = req.body || {};
        const fileUrls = uploadedFilesToUrls(req);

        const data = {
            owner: userId,
            businessName: body.businessName,
            email: body.email,
            address: body.address || "",
            phone: body.phone || "",
            gstNumber: body.gstNumber || "",
            defaultTaxPercent: body.defaultTaxPercent ?? 18,
            ...fileUrls,
            signatureOwnerName: body.signatureOwnerName || "",
            signatureOwnerTitle: body.signatureOwnerTitle || "",
        };

        // upsert so each user has one profile
        const profile = await BusinessProfile.findOneAndUpdate(
            { owner: userId },
            { $set: data },
            { upsert: true, new: true, runValidators: true }
        );

        return res.status(201).json({ success: true, data: profile });
    } catch (err) {
        console.error("createBusiness Profile error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export async function updateBusinessProfile(req, res) {
    try {
        const { userId } = getAuth(req) || {};
        if (!userId) return res.status(401).json({ success: false, message: "Auth required" });

        const { id } = req.params;
        const body = req.body || {};
        const fileUrls = uploadedFilesToUrls(req);

        const update = {
            businessName: body.businessName,
            email: body.email,
            address: body.address ?? undefined,
            phone: body.phone ?? undefined,
            gstNumber: body.gstNumber,
            defaultTaxPercent: body.defaultTaxPercent,
            ...fileUrls,
            signatureOwnerName: body.signatureOwnerName,
            signatureOwnerTitle: body.signatureOwnerTitle,
        };
        Object.keys(update).forEach(k => update[k] === undefined && delete update[k]);

        const updated = await BusinessProfile.findOneAndUpdate(
            { _id: id, owner: userId },
            { $set: update },
            { new: true, runValidators: true }
        );

        if (!updated) return res.status(404).json({ success: false, message: "Profile not found" });
        return res.status(200).json({ success: true, data: updated });
    } catch (err) {
        console.error("updateBusinessProfile error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export async function getBusinessProfile(req, res) {
    try {
        const { userId } = getAuth(req) || {};
        if (!userId) return res.status(401).json({ success: false, message: "Auth required" });

        const profile = await BusinessProfile.findOne({ owner: userId });
        if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });
        return res.status(200).json({ success: true, data: profile });
    } catch (err) {
        console.error("getBusinessProfile error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}