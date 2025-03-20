// src/pages/CourseDetail.js
import React, { useState, useEffect } from "react";
import {
	Container,
	Typography,
	Box,
	Grid,
	Paper,
	Button,
	Chip,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Card,
	CardContent,
	CircularProgress,
	Breadcrumbs,
	Link as MuiLink,
} from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import SchoolIcon from "@mui/icons-material/School";
import CategoryIcon from "@mui/icons-material/Category";
import PaymentIcon from "@mui/icons-material/Payment";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { showErrorToast } from "../utils/toast";

const CourseDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [course, setCourse] = useState(null);
	const [loading, setLoading] = useState(true);
	const [relatedCourses, setRelatedCourses] = useState([]);

	useEffect(() => {
		const fetchCourseDetails = async () => {
			try {
				setLoading(true);
				const response = await api.public.getCourseById(id);
				
				// Extract course data from response
				const courseData = response.data || response;
				console.log("Course data fetched:", courseData);
				
				setCourse(courseData);

				// Fetch related courses from the same department
				if (courseData && courseData.departmentId) {
					const coursesResponse = await api.public.getCourses();
					
					// Extract courses data from response
					const allCourses = coursesResponse.data || coursesResponse || [];
					console.log("All courses fetched:", allCourses);
					
					const related = allCourses
						.filter(
							(c) =>
								c.departmentId &&
								c.departmentId._id === courseData.departmentId._id &&
								c._id !== courseData._id
						)
						.slice(0, 3);
					setRelatedCourses(related);
				}
			} catch (error) {
				console.error("Error fetching course details:", error);
				showErrorToast("Failed to load course details");
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchCourseDetails();
		}
	}, [id]);

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "60vh",
				}}>
				<CircularProgress />
			</Box>
		);
	}

	if (!course) {
		return (
			<Container sx={{ py: 8 }}>
				<Typography variant='h5' color='error' align='center'>
					Course not found
				</Typography>
				<Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
					<Button
						variant='contained'
						startIcon={<ArrowBackIcon />}
						onClick={() => navigate("/courses")}>
						Back to Courses
					</Button>
				</Box>
			</Container>
		);
	}

	return (
		<Container maxWidth='lg' sx={{ py: 5 }}>
			{/* Breadcrumbs */}
			<Breadcrumbs
				separator={<NavigateNextIcon fontSize='small' />}
				aria-label='breadcrumb'
				sx={{ mb: 3 }}>
				<MuiLink component={Link} to='/' color='inherit'>
					Home
				</MuiLink>
				<MuiLink component={Link} to='/courses' color='inherit'>
					Courses
				</MuiLink>
				<Typography color='text.primary'>{course.name}</Typography>
			</Breadcrumbs>

			<Grid container spacing={4}>
				{/* Main Content */}
				<Grid item xs={12} md={8}>
					<Paper
						elevation={3}
						sx={{
							p: 4,
							borderRadius: 2,
							background: "linear-gradient(to right, #f5f7fa, #ffffff)",
						}}>
						<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
							<Button
								variant='outlined'
								size='small'
								startIcon={<ArrowBackIcon />}
								component={Link}
								to='/courses'
								sx={{ mr: 2 }}>
								Back
							</Button>
							<Chip
								label={course.categoryId?.name || "Uncategorized"}
								color='primary'
								size='small'
								icon={<CategoryIcon />}
							/>
						</Box>

						<Typography
							variant='h3'
							component='h1'
							gutterBottom
							sx={{
								color: "#8A2BE2",
								fontWeight: 700,
								fontSize: { xs: "2rem", md: "2.5rem" },
							}}>
							{course.name}
						</Typography>

						<Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
							<SchoolIcon sx={{ color: "text.secondary", mr: 1 }} />
							<Typography variant='subtitle1' color='text.secondary'>
								{course.departmentId?.name || "Department not specified"}
							</Typography>
						</Box>

						<Divider sx={{ my: 3 }} />

						<Typography variant='h5' gutterBottom sx={{ fontWeight: 600 }}>
							Course Overview
						</Typography>

						<Typography variant='body1' paragraph sx={{ mb: 4 }}>
							{course.description ||
								"This comprehensive course is designed to provide students with in-depth knowledge and practical skills in the field. Through a combination of theoretical learning and hands-on experience, students will develop expertise that prepares them for successful careers."}
						</Typography>

						<Typography variant='h5' gutterBottom sx={{ fontWeight: 600 }}>
							Key Features
						</Typography>

						<List>
							<ListItem>
								<ListItemIcon>
									<CheckCircleIcon color='primary' />
								</ListItemIcon>
								<ListItemText primary='Expert faculty with industry experience' />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CheckCircleIcon color='primary' />
								</ListItemIcon>
								<ListItemText primary='State-of-the-art facilities and resources' />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CheckCircleIcon color='primary' />
								</ListItemIcon>
								<ListItemText primary='Practical training and internship opportunities' />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CheckCircleIcon color='primary' />
								</ListItemIcon>
								<ListItemText primary='Industry-relevant curriculum' />
							</ListItem>
						</List>

						<Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
							{course.formUrl ? (
								<Button
									variant='contained'
									color='primary'
									size='large'
									href={course.formUrl}
									target='_blank'
									sx={{
										px: 4,
										py: 1.5,
										borderRadius: 2,
										fontWeight: "bold",
										fontSize: "1.1rem",
									}}>
									Apply Now
								</Button>
							) : (
								<Button
									variant='contained'
									color='primary'
									size='large'
									component={Link}
									to='/register'
									sx={{
										px: 4,
										py: 1.5,
										borderRadius: 2,
										fontWeight: "bold",
										fontSize: "1.1rem",
									}}>
									Apply for Admission
								</Button>
							)}
						</Box>
					</Paper>
				</Grid>

				{/* Sidebar */}
				<Grid item xs={12} md={4}>
					{/* Fee Structure Card */}
					<Card elevation={3} sx={{ mb: 4, borderRadius: 2 }}>
						<CardContent>
							<Typography
								variant='h6'
								gutterBottom
								sx={{
									display: "flex",
									alignItems: "center",
									color: "primary.main",
									fontWeight: 600,
								}}>
								<PaymentIcon sx={{ mr: 1 }} />
								Fee Structure
							</Typography>

							<Divider sx={{ my: 2 }} />

							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									mb: 2,
								}}>
								<Typography variant='body1'>Registration Fee:</Typography>
								<Typography variant='body1' fontWeight='bold'>
									₹
									{course.feeStructure?.registrationFee?.toLocaleString() ||
										"0"}
								</Typography>
							</Box>

							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Typography variant='body1'>Full Course Fee:</Typography>
								<Typography variant='body1' fontWeight='bold'>
									₹{course.feeStructure?.fullFee?.toLocaleString() || "0"}
								</Typography>
							</Box>

							<Typography
								variant='caption'
								color='text.secondary'
								sx={{ display: "block", mt: 2 }}>
								* Fees are subject to change. Scholarships available for
								eligible students.
							</Typography>
						</CardContent>
					</Card>

					{/* Department Info Card */}
					<Card elevation={3} sx={{ mb: 4, borderRadius: 2 }}>
						<CardContent>
							<Typography
								variant='h6'
								gutterBottom
								sx={{
									display: "flex",
									alignItems: "center",
									color: "primary.main",
									fontWeight: 600,
								}}>
								<SchoolIcon sx={{ mr: 1 }} />
								Department
							</Typography>

							<Divider sx={{ my: 2 }} />

							<Typography variant='body1' paragraph>
								{course.departmentId?.name ||
									"Department information not available"}
							</Typography>

							<Button
								variant='outlined'
								size='small'
								component={Link}
								to={`/department/${course.departmentId?.name || ""}`}
								sx={{ mt: 1 }}
								disabled={!course.departmentId}>
								View Department
							</Button>
						</CardContent>
					</Card>

					{/* Related Courses */}
					{relatedCourses.length > 0 && (
						<Card elevation={3} sx={{ borderRadius: 2 }}>
							<CardContent>
								<Typography
									variant='h6'
									gutterBottom
									sx={{
										color: "primary.main",
										fontWeight: 600,
									}}>
									Related Courses
								</Typography>

								<Divider sx={{ my: 2 }} />

								<List disablePadding>
									{relatedCourses.map((relatedCourse) => (
										<ListItem
											key={relatedCourse._id}
											component={Link}
											to={`/courses/${relatedCourse._id}`}
											sx={{
												px: 0,
												py: 1,
												textDecoration: "none",
												color: "inherit",
												"&:hover": {
													backgroundColor: "rgba(0, 0, 0, 0.04)",
												},
											}}>
											<ListItemText
												primary={relatedCourse.name}
												secondary={
													relatedCourse.categoryId?.name || "Uncategorized"
												}
											/>
										</ListItem>
									))}
								</List>

								<Button
									variant='text'
									component={Link}
									to='/courses'
									sx={{ mt: 2 }}
									fullWidth>
									View All Courses
								</Button>
							</CardContent>
						</Card>
					)}
				</Grid>
			</Grid>
		</Container>
	);
};

export default CourseDetail;
