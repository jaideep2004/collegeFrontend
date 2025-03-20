import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, allowedRoles }) => {
	const token = localStorage.getItem("token");
	if (!token) return <Navigate to='/login' />;

	try {
		const decoded = jwtDecode(token);
		const userRole = decoded.user.role;
		if (!allowedRoles.includes(userRole)) return <Navigate to='/' />;
		return children;
	} catch (err) {
		localStorage.removeItem("token");
		return <Navigate to='/login' />;
	}
};

export default PrivateRoute;
