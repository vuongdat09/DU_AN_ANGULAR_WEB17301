import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/angularDB");

export const viteNodeApp = app;
