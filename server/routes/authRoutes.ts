import express from "express";
import { authController } from "../app";
import { isLoggedIn } from "../guard";

export const authRoutes = () => {
   const authRoutes = express.Router();

   authRoutes.post('/', authController.login);
   authRoutes.get('/userRetrieval', isLoggedIn, authController.retrieveLogin);

   return authRoutes;
}