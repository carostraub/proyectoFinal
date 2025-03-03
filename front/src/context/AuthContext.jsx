import { createContext, useContext, useEffect, useState } from "react";
import { baseURL } from "../config";
import { Navigate } from "react-router-dom";

const AuthContext = createContext(null);