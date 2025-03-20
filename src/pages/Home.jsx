import React, { useState, useEffect } from "react";
import {
	Box,
	Container,
	Grid,
	Typography,
	Button,
	Card,
	CardContent,
	CardMedia,
	Avatar,
	Chip,
	CircularProgress,
	Rating,
	Divider,
	TextField,
	IconButton,
	Paper,
	Tabs,
	Tab,
	useTheme,
	useMediaQuery,
	Skeleton,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import BookIcon from "@mui/icons-material/Book";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import api from "../services/api";

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
	position: "relative",
	height: "100vh",
	minHeight: "700px",
	width: "100%",
	overflow: "hidden",
	color: "#fff",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	"&::before": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		zIndex: 1,
	},
	[theme.breakpoints.down("md")]: {
		minHeight: "600px",
	},
}));

const HeroBackground = styled(Box)(({ theme }) => ({
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	// background: 'linear-gradient(135deg, #8A2BE2 0%, #4B0082 100%)',
	zIndex: 0,
	"&::after": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background:
			"radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.4) 100%)",
	},
}));

const HeroContent = styled(Box)(({ theme }) => ({
	position: "relative",
	zIndex: 2,
	textAlign: "left",
	maxWidth: "1200px",
	width: "100%",
	padding: theme.spacing(0, 3),
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
	fontWeight: 800,
	fontSize: "4.5rem",
	lineHeight: 1.1,
	marginBottom: theme.spacing(3),
	textTransform: "capitalize",
	"& span": {
		color: theme.palette.primary.main,
	},
	[theme.breakpoints.down("md")]: {
		fontSize: "3rem",
	},
	[theme.breakpoints.down("sm")]: {
		fontSize: "2.5rem",
	},
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
	fontSize: "1.25rem",
	marginBottom: theme.spacing(5),
	maxWidth: "600px",
	lineHeight: 1.6,
	[theme.breakpoints.down("sm")]: {
		fontSize: "1rem",
	},
}));

const HeroButton = styled(Button)(({ theme }) => ({
	borderRadius: "50px",
	padding: theme.spacing(1.5, 4),
	fontSize: "1rem",
	fontWeight: "bold",
	textTransform: "capitalize",
	marginRight: theme.spacing(2),
	boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
	transition: "all 0.3s ease",
	"&:hover": {
		transform: "translateY(-3px)",
		boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
	},
}));

const HeroShape = styled(Box)(({ theme }) => ({
	position: "absolute",
	bottom: "-1px",
	left: 0,
	width: "100%",
	height: "150px",
	zIndex: 2,
	overflow: "hidden",
	"& svg": {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "100%",
		height: "100%",
	},
}));

const HeroStats = styled(Box)(({ theme }) => ({
	position: "absolute",
	bottom: "30px",
	right: "50px",
	zIndex: 3,
	display: "flex",
	gap: theme.spacing(3),
	[theme.breakpoints.down("md")]: {
		display: "none",
	},
}));

const StatItem = styled(Box)(({ theme }) => ({
	backgroundColor: "#000000",
	// backdropFilter: 'blur(20px)',
	borderRadius: "10px",
	padding: theme.spacing(2),
	textAlign: "center",
	minWidth: "120px",
	border: "1px solid rgba(255, 255, 255, 0.2)",
}));

const StatBox = styled(Box)(({ theme }) => ({
	textAlign: "center",
	padding: theme.spacing(3),
	backgroundColor: "#fff",
	borderRadius: theme.shape.borderRadius * 2,
	boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
	transition: "transform 0.3s",
	"&:hover": {
		transform: "translateY(-5px)",
	},
}));

const StatIcon = styled(Box)(({ theme }) => ({
	width: 60,
	height: 60,
	borderRadius: "50%",
	backgroundColor: "rgba(93, 211, 158, 0.1)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	margin: "0 auto",
	marginBottom: theme.spacing(2),
	"& svg": {
		fontSize: 30,
		color: theme.palette.primary.main,
	},
}));

const SearchBox = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(0.5, 2),
	display: "flex",
	alignItems: "center",
	width: "100%",
	maxWidth: 600,
	margin: "0 auto",
	marginTop: theme.spacing(4),
	borderRadius: theme.shape.borderRadius * 4,
	boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
}));

const FeatureCard = styled(Card)(({ theme }) => ({
	height: "100%",
	textAlign: "center",
	padding: theme.spacing(3),
	transition: "transform 0.3s, box-shadow 0.3s",
	"&:hover": {
		transform: "translateY(-10px)",
		boxShadow: theme.shadows[10],
	},
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
	width: 80,
	height: 80,
	borderRadius: "50%",
	backgroundColor: "rgba(93, 211, 158, 0.1)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	margin: "0 auto",
	marginBottom: theme.spacing(2),
	"& svg": {
		fontSize: 40,
		color: theme.palette.primary.main,
	},
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
	position: "relative",
	marginBottom: theme.spacing(6),
	paddingBottom: theme.spacing(2),
	textAlign: "center",
	"&:after": {
		content: '""',
		position: "absolute",
		bottom: 0,
		left: "50%",
		transform: "translateX(-50%)",
		width: 80,
		height: 3,
		backgroundColor: theme.palette.primary.main,
	},
}));

const CourseCard = styled(Card)(({ theme }) => ({
	height: "100%",
	display: "flex",
	flexDirection: "column",
	transition: "transform 0.3s, box-shadow 0.3s",
	"&:hover": {
		transform: "translateY(-8px)",
		boxShadow: theme.shadows[8],
	},
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
	position: "absolute",
	top: 16,
	left: 16,
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	fontWeight: "bold",
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
	height: "100%",
	padding: theme.spacing(4),
	position: "relative",
	overflow: "visible",
}));

const QuoteIcon = styled(FormatQuoteIcon)(({ theme }) => ({
	position: "absolute",
	top: -15,
	left: 20,
	fontSize: 60,
	color: "rgba(93, 211, 158, 0.2)",
	transform: "rotate(180deg)",
}));

const TestimonialAvatar = styled(Avatar)(({ theme }) => ({
	width: 70,
	height: 70,
	border: `3px solid ${theme.palette.primary.main}`,
	marginRight: theme.spacing(2),
}));

const EventCard = styled(Card)(({ theme }) => ({
	display: "flex",
	marginBottom: theme.spacing(2),
	overflow: "hidden",
	transition: "transform 0.3s",
	"&:hover": {
		transform: "translateX(5px)",
	},
}));

const EventDate = styled(Box)(({ theme }) => ({
	width: 80,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	padding: theme.spacing(1),
}));

const AnnouncementCard = styled(Card)(({ theme }) => ({
	marginBottom: theme.spacing(2),
	transition: "transform 0.3s",
	"&:hover": {
		transform: "translateY(-5px)",
	},
}));

const Home = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));

	const [loading, setLoading] = useState(true);
	const [announcements, setAnnouncements] = useState([]);
	const [courses, setCourses] = useState([]);
	const [events, setEvents] = useState([]);
	const [testimonials, setTestimonials] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [tabValue, setTabValue] = useState(0);
	const [departments, setDepartments] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				// Fetch all required data
				const [
					announcementsRes,
					coursesRes,
					eventsRes,
					departmentsRes,
					testimonialsRes,
				] = await Promise.all([
					api.public.getAnnouncements(),
					api.public.getCourses(),
					api.public.getEvents(),
					api.public.getDepartments(),
					api.public.getTestimonials(),
				]);

				// Log raw responses for debugging
				console.log("Raw announcements response:", announcementsRes);
				console.log("Raw courses response:", coursesRes);
				console.log("Raw events response:", eventsRes);
				console.log("Raw departments response:", departmentsRes);
				console.log("Raw testimonials response:", testimonialsRes);

				// Extract data from response objects with proper handling of different response structures
				let announcements = [];
				if (announcementsRes) {
					if (Array.isArray(announcementsRes)) {
						announcements = announcementsRes;
					} else if (
						announcementsRes.data &&
						Array.isArray(announcementsRes.data)
					) {
						announcements = announcementsRes.data;
					}
				}

				let courses = [];
				if (coursesRes) {
					if (Array.isArray(coursesRes)) {
						courses = coursesRes;
					} else if (coursesRes.data && Array.isArray(coursesRes.data)) {
						courses = coursesRes.data;
					}
				}

				let events = [];
				if (eventsRes) {
					if (Array.isArray(eventsRes)) {
						events = eventsRes;
					} else if (eventsRes.data && Array.isArray(eventsRes.data)) {
						events = eventsRes.data;
					}
				}

				let departments = [];
				if (departmentsRes) {
					if (Array.isArray(departmentsRes)) {
						departments = departmentsRes;
					} else if (
						departmentsRes.data &&
						Array.isArray(departmentsRes.data)
					) {
						departments = departmentsRes.data;
					}
				}

				// Ensure testimonials is an array
				let testimonials = [];
				if (testimonialsRes) {
					if (Array.isArray(testimonialsRes)) {
						testimonials = testimonialsRes;
					} else if (
						testimonialsRes.data &&
						Array.isArray(testimonialsRes.data)
					) {
						testimonials = testimonialsRes.data;
					}
				}

				console.log("Processed courses:", courses);
				console.log("Processed events:", events);
				console.log("Processed testimonials:", testimonials);

				// Set state with the fetched data
				setAnnouncements(announcements);
				setCourses(courses);
				setEvents(events);
				setDepartments(departments);
				setTestimonials(testimonials);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
				// Don't use mock data, show empty state instead
				setAnnouncements([]);
				setCourses([]);
				setEvents([]);
				setTestimonials([]);
				setDepartments([]);
			}
		};

		fetchData();
	}, []);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		// Implement search functionality
		console.log("Searching for:", searchQuery);
	};

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "80vh",
				}}>
				<CircularProgress color='primary' />
			</Box>
		);
	}

	return (
		<Box sx={{ fontFamily: "Poppins, sans-serif" }}>
			{/* Hero Section */}
			<HeroSection>
				<HeroBackground />
				<HeroContent>
					<Grid container spacing={4}>
						<Grid item xs={12} md={8} lg={7}>
							<Box
								sx={{
									animation: "fadeInUp 1s ease-out",
									"@keyframes fadeInUp": {
										"0%": {
											opacity: 0,
											transform: "translateY(40px)",
										},
										"100%": {
											opacity: 1,
											transform: "translateY(0)",
										},
									},
								}}>
								<Typography
									variant='subtitle1'
									sx={{
										mb: 2,
										color: theme.palette.primary.main,
										fontWeight: "bold",
										textTransform: "uppercase",
										letterSpacing: 2,
										display: "inline-block",
										position: "relative",
										paddingLeft: "50px",
										"&::before": {
											content: '""',
											position: "absolute",
											left: 0,
											top: "50%",
											width: "40px",
											height: "2px",
											backgroundColor: theme.palette.primary.main,
											transform: "translateY(-50%)",
										},
									}}>
									WELCOME TO OUR COLLEGE
								</Typography>
								<HeroTitle variant='h1'>
									Discover A New Way Of <span>Learning</span> & Growing
								</HeroTitle>
								<HeroSubtitle variant='body1'>
									Our college offers a transformative educational experience
									focused on academic excellence, innovation, and preparing
									students for successful careers in a rapidly changing world.
								</HeroSubtitle>
								<Box sx={{ display: "flex", flexWrap: "wrap", mb: 4 }}>
									<HeroButton
										variant='contained'
										color='primary'
										component={RouterLink}
										to='/courses'>
										Explore Courses
									</HeroButton>
									<HeroButton
										variant='outlined'
										sx={{
											color: "#fff",
											borderColor: "rgba(255,255,255,0.5)",
											"&:hover": {
												borderColor: "#fff",
												backgroundColor: "rgba(255,255,255,0.1)",
											},
										}}
										component={RouterLink}
										to='/register'>
										Apply Now
									</HeroButton>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</HeroContent>
				<HeroShape>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 1440 320'
						preserveAspectRatio='none'>
						<path
							fill='#ffffff'
							fillOpacity='1'
							d='M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
					</svg>
				</HeroShape>
				<HeroStats>
					<StatItem>
						<Typography variant='h4' fontWeight='bold' color='primary.main'>
							5K+
						</Typography>
						<Typography variant='body2'>Students</Typography>
					</StatItem>
					<StatItem>
						<Typography variant='h4' fontWeight='bold' color='primary.main'>
							200+
						</Typography>
						<Typography variant='body2'>Courses</Typography>
					</StatItem>
					<StatItem>
						<Typography variant='h4' fontWeight='bold' color='primary.main'>
							50+
						</Typography>
						<Typography variant='body2'>Teachers</Typography>
					</StatItem>
				</HeroStats>
			</HeroSection>

			{/* Features Section */}
			<Container sx={{ py: 8 }}>
				<SectionTitle variant='h4' component='h2' fontWeight='bold'>
					Why Choose Us
				</SectionTitle>

				<Grid container spacing={4}>
					{[
						{
							icon: <SchoolIcon />,
							title: "Quality Education",
							description:
								"Our curriculum is designed to provide comprehensive knowledge and practical skills that prepare students for real-world challenges.",
							image: "/images/brainstorm-meeting.jpg",
						},
						{
							icon: <PersonIcon />,
							title: "Expert Faculty",
							description:
								"Learn from experienced professors and industry professionals who are dedicated to your academic and professional success.",
							image:
								"https://img.freepik.com/free-photo/lecture-notes_1098-16270.jpg",
						},
						{
							icon: <BookIcon />,
							title: "Modern Facilities",
							description:
								"Access state-of-the-art laboratories, libraries, and digital resources that enhance your learning experience.",
							image:
								"https://img.freepik.com/free-photo/analog-landscape-city-with-buildings_23-2149661462.jpg",
						},
						{
							icon: <CheckCircleIcon />,
							title: "Career Support",
							description:
								"Benefit from our career counseling, internship opportunities, and industry connections to jumpstart your career.",
							image:
								"https://img.freepik.com/free-photo/bussiness-people-working-team-office_1303-22863.jpg",
						},
					].map((feature, index) => (
						<Grid item xs={12} sm={6} md={3} key={index}>
							<FeatureCard>
								<Box
									sx={{
										position: "relative",
										height: 140,
										mb: 2,
										overflow: "hidden",
										borderRadius: 2,
									}}>
									<Box
										component='img'
										src={feature.image}
										alt={feature.title}
										sx={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
											transition: "transform 0.3s ease",
											"&:hover": {
												transform: "scale(1.05)",
											},
										}}
									/>
								</Box>
								<FeatureIcon>{feature.icon}</FeatureIcon>
								<Typography
									variant='h6'
									component='h3'
									gutterBottom
									fontWeight='bold'>
									{feature.title}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									{feature.description}
								</Typography>
							</FeatureCard>
						</Grid>
					))}
				</Grid>
			</Container>

			{/* Popular Courses Section */}
			<Box sx={{ py: 8, bgcolor: "#f8f9fa" }}>
				<Container>
					<SectionTitle variant='h4' component='h2'>
						Popular Courses
					</SectionTitle>

					{/* Course Category Tabs */}
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						centered
						sx={{ mb: 4 }}>
						<Tab label='All Categories' />
						{Array.isArray(departments) &&
							departments
								.slice(0, 5)
								.map((dept, index) => (
									<Tab
										key={dept._id || index}
										label={dept.name}
										value={index + 1}
									/>
								))}
					</Tabs>

					<Grid container spacing={4}>
						{loading ? (
							Array.from(new Array(4)).map((_, index) => (
								<Grid item xs={12} sm={6} md={3} key={index}>
									<Card sx={{ height: "100%" }}>
										<Skeleton variant='rectangular' height={200} />
										<CardContent>
											<Skeleton variant='text' height={30} />
											<Skeleton variant='text' height={20} />
											<Skeleton variant='text' height={20} />
											<Skeleton variant='text' height={40} />
										</CardContent>
									</Card>
								</Grid>
							))
						) : Array.isArray(courses) && courses.length > 0 ? (
							courses
								.filter(
									(course) =>
										tabValue === 0 ||
										(course.departmentId &&
											course.departmentId._id ===
												departments[tabValue - 1]?._id)
								)
								.slice(0, 4)
								.map((course, index) => (
									<Grid item xs={12} sm={6} md={3} key={course._id || index}>
										<CourseCard>
											<CardMedia
												component='img'
												height='200'
												image={
													course.thumbnailUrl ||
													course.fileUrl ||
													(index % 2 === 0
														? "/images/image-4.jpg"
														: "/images/image-5.jpg")
												}
												alt={course.name}
											/>
											<CardContent>
												<Typography variant='h6' component='h3' gutterBottom>
													{course.name}
												</Typography>
												<Box
													sx={{ display: "flex", alignItems: "center", mb: 1 }}>
													<Typography variant='body2' color='text.secondary'>
														{course.departmentId?.name || "Department"}
													</Typography>
												</Box>
												<Box
													sx={{
														display: "flex",
														justifyContent: "space-between",
														alignItems: "center",
														mt: 2,
													}}>
													<Typography
														variant='subtitle1'
														fontWeight='bold'
														color='primary'>
														₹
														{course.feeStructure?.fullFee?.toLocaleString() ||
															"Free"}
													</Typography>
													<Button
														variant='outlined'
														size='small'
														component={RouterLink}
														to={`/courses/${course._id}`}>
														Details
													</Button>
												</Box>
											</CardContent>
										</CourseCard>
									</Grid>
								))
						) : (
							<Grid item xs={12}>
								<Box sx={{ textAlign: "center", py: 5 }}>
									<Typography variant='h6' color='text.secondary'>
										No courses available at the moment.
									</Typography>
								</Box>
							</Grid>
						)}
					</Grid>
					<Box sx={{ textAlign: "center", mt: 4 }}>
						<Button
							variant='contained'
							size='large'
							component={RouterLink}
							to='/courses'
							endIcon={<ArrowForwardIcon />}>
							View All Courses
						</Button>
					</Box>
				</Container>
			</Box>

			{/* Stats Section */}
			<Box
				sx={{
					py: 8,
					background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/images/book-with-green-board-background.jpg')`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					color: "#fff",
				}}>
				<Container>
					<Grid container spacing={4} justifyContent='center'>
						{[
							{ icon: <PersonIcon />, count: "5,000+", label: "Students" },
							{ icon: <SchoolIcon />, count: "200+", label: "Courses" },
							{ icon: <BookIcon />, count: "50+", label: "Faculty Members" },
							{
								icon: <CheckCircleIcon />,
								count: "95%",
								label: "Success Rate",
							},
						].map((stat, index) => (
							<Grid item xs={6} md={3} key={index}>
								<StatBox
									sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
									<StatIcon
										sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
										{stat.icon}
									</StatIcon>
									<Typography
										variant='h3'
										component='div'
										fontWeight='bold'
										sx={{ mb: 1 }}>
										{stat.count}
									</Typography>
									<Typography variant='h6' component='div'>
										{stat.label}
									</Typography>
								</StatBox>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>

			{/* Announcements & Events Section */}
			<Box sx={{ py: 8 }}>
				<Container>
					<Grid container spacing={4}>
						{/* Latest Announcements */}
						<Grid item xs={12} md={6}>
							<SectionTitle
								variant='h4'
								component='h2'
								sx={{ textAlign: "left", mb: 3 }}>
								Latest Announcements
							</SectionTitle>
							{loading ? (
								Array.from(new Array(3)).map((_, index) => (
									<Box key={index} sx={{ mb: 3 }}>
										<Skeleton variant='text' height={30} />
										<Skeleton variant='text' height={20} />
										<Skeleton variant='text' height={20} />
									</Box>
								))
							) : announcements.length > 0 ? (
								announcements.slice(0, 3).map((announcement, index) => (
									<Card
										key={announcement._id || index}
										sx={{ mb: 3, boxShadow: 2 }}>
										<CardContent>
											<Typography variant='h6' component='h3' gutterBottom>
												{announcement.title}
											</Typography>
											<Typography
												variant='body2'
												color='text.secondary'
												sx={{ mb: 2 }}>
												{announcement.description?.substring(0, 120)}...
											</Typography>
											<Box
												sx={{
													display: "flex",
													justifyContent: "space-between",
													alignItems: "center",
												}}>
												<Typography variant='caption' color='text.secondary'>
													{new Date(
														announcement.uploadedAt
													).toLocaleDateString()}
												</Typography>
												<Button
													size='small'
													color='primary'
													component={RouterLink}
													to={`/announcements/${announcement._id}`}>
													Read More
												</Button>
											</Box>
										</CardContent>
									</Card>
								))
							) : (
								<Box sx={{ textAlign: "center", py: 3 }}>
									<Typography variant='body1' color='text.secondary'>
										No announcements available at the moment.
									</Typography>
								</Box>
							)}
							<Box sx={{ textAlign: "right", mt: 2 }}>
								<Button
									color='primary'
									endIcon={<ArrowForwardIcon />}
									component={RouterLink}
									to='/announcements'>
									View All Announcements
								</Button>
							</Box>
						</Grid>

						{/* Upcoming Events */}
						<Grid item xs={12} md={6}>
							<SectionTitle
								variant='h4'
								component='h2'
								sx={{ textAlign: "left", mb: 3 }}>
								Upcoming Events
							</SectionTitle>
							{loading ? (
								Array.from(new Array(3)).map((_, index) => (
									<Box key={index} sx={{ mb: 3 }}>
										<Skeleton variant='rectangular' height={100} />
									</Box>
								))
							) : Array.isArray(events) && events.length > 0 ? (
								events.slice(0, 3).map((event, index) => (
									<Card
										key={event._id || index}
										sx={{ mb: 3, display: "flex", boxShadow: 2 }}
										component={RouterLink}
										to={`/events/${event._id}`}
										style={{ textDecoration: "none", color: "inherit" }}>
										<Box
											sx={{
												width: 100,
												bgcolor: "primary.main",
												color: "white",
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
												justifyContent: "center",
											}}>
											<Typography
												variant='h4'
												component='div'
												fontWeight='bold'>
												{new Date(
													event.eventDate || event.uploadedAt
												).getDate()}
											</Typography>
											<Typography variant='caption'>
												{new Date(
													event.eventDate || event.uploadedAt
												).toLocaleString("default", {
													month: "short",
												})}
											</Typography>
										</Box>
										<CardContent sx={{ flex: 1 }}>
											<Typography variant='h6' component='h3' gutterBottom>
												{event.title}
											</Typography>
											<Typography
												variant='body2'
												color='text.secondary'
												sx={{ mb: 1 }}>
												{event.description?.substring(0, 80)}...
											</Typography>
											<Box sx={{ display: "flex", alignItems: "center" }}>
												<AccessTimeIcon
													fontSize='small'
													sx={{ mr: 0.5, color: "text.secondary" }}
												/>
												<Typography variant='caption' color='text.secondary'>
													{new Date(
														event.eventDate || event.uploadedAt
													).toLocaleTimeString([], {
														hour: "2-digit",
														minute: "2-digit",
													})}
												</Typography>
											</Box>
										</CardContent>
									</Card>
								))
							) : (
								<Box sx={{ textAlign: "center", py: 3 }}>
									<Typography variant='body1' color='text.secondary'>
										No upcoming events at the moment.
									</Typography>
								</Box>
							)}
							<Box sx={{ textAlign: "right", mt: 2 }}>
								<Button
									color='primary'
									endIcon={<ArrowForwardIcon />}
									component={RouterLink}
									to='/events'>
									View All Events
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>

			{/* Testimonials Section */}
			<Box sx={{ py: 8, bgcolor: "#f8f9fa" }}>
				<Container>
					<SectionTitle variant='h4' component='h2'>
						What Our Students Say
					</SectionTitle>
					<Grid container spacing={4}>
						{loading ? (
							Array.from(new Array(3)).map((_, index) => (
								<Grid item xs={12} md={4} key={index}>
									<Card sx={{ height: "100%", boxShadow: 3 }}>
										<CardContent>
											<Skeleton
												variant='circular'
												width={60}
												height={60}
												sx={{ mb: 2 }}
											/>
											<Skeleton variant='text' height={100} />
											<Skeleton variant='text' height={30} />
											<Skeleton variant='text' height={20} />
										</CardContent>
									</Card>
								</Grid>
							))
						) : Array.isArray(testimonials) && testimonials.length > 0 ? (
							testimonials.slice(0, 3).map((testimonial, index) => (
								<Grid item xs={12} md={4} key={testimonial._id || index}>
									<TestimonialCard>
										<CardContent>
											<Box
												sx={{
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
													mb: 2,
												}}>
												<Avatar
													src={testimonial.thumbnailUrl || testimonial.fileUrl}
													alt={testimonial.title}
													sx={{
														width: 80,
														height: 80,
														mb: 2,
														border: "4px solid #fff",
														boxShadow: "0 0 15px rgba(0,0,0,0.1)",
													}}
												/>
												<Typography variant='h6' component='h3' gutterBottom>
													{testimonial.title}
												</Typography>
												<Typography
													variant='body2'
													color='text.secondary'
													gutterBottom>
													Student
												</Typography>
												<Rating
													value={5}
													readOnly
													size='small'
													sx={{ mb: 2 }}
												/>
											</Box>
											<Box
												sx={{
													position: "relative",
													p: 2,
													bgcolor: "rgba(0,0,0,0.02)",
													borderRadius: 2,
													"&::before": {
														content: '""',
														position: "absolute",
														top: -10,
														left: "calc(50% - 10px)",
														width: 0,
														height: 0,
														borderLeft: "10px solid transparent",
														borderRight: "10px solid transparent",
														borderBottom: "10px solid rgba(0,0,0,0.02)",
													},
												}}>
												<FormatQuoteIcon
													sx={{
														position: "absolute",
														top: -15,
														left: 10,
														color: "primary.main",
														opacity: 0.2,
														fontSize: 40,
													}}
												/>
												<Typography variant='body2' paragraph>
													{testimonial.description?.substring(0, 150)}
													{testimonial.description?.length > 150 ? "..." : ""}
												</Typography>
											</Box>
										</CardContent>
									</TestimonialCard>
								</Grid>
							))
						) : (
							<Grid item xs={12}>
								<Box sx={{ textAlign: "center", py: 5 }}>
									<Typography variant='h6' color='text.secondary'>
										No testimonials available at the moment.
									</Typography>
								</Box>
							</Grid>
						)}
					</Grid>
				</Container>
			</Box>

			{/* Call to Action Section */}
			<Box
				sx={{
					py: 8,
					bgcolor: theme.palette.primary.main,
					color: theme.palette.primary.contrastText,
				}}>
				<Container>
					<Grid container spacing={4} alignItems='center'>
						<Grid item xs={12} md={8}>
							<Typography
								variant='h4'
								component='h2'
								fontWeight='bold'
								gutterBottom>
								Ready to Start Your Academic Journey?
							</Typography>
							<Typography variant='h6' sx={{ mb: 2, opacity: 0.9 }}>
								Apply now for the upcoming academic session and take the first
								step towards a successful career.
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							md={4}
							sx={{ textAlign: { xs: "center", md: "right" } }}>
							<Button
								variant='contained'
								size='large'
								component={RouterLink}
								to='/register'
								sx={{
									px: 4,
									backgroundColor: "#fff",
									color: theme.palette.primary.main,
									"&:hover": { backgroundColor: "#f0f0f0" },
								}}>
								Apply Now
							</Button>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</Box>
	);
};

// Mock data for fallback
const mockAnnouncements = [
	{
		_id: "1",
		title: "Admission Open for 2023-24 Academic Year",
		description:
			"Applications are now being accepted for the upcoming academic year. Early applicants will receive priority consideration for scholarships and financial aid.",
		uploadedAt: new Date("2023-03-15"),
		fileUrl: "#",
	},
	// ... other mock announcements
];

const mockCourses = [
	{
		_id: "1",
		name: "Bachelor of Computer Science",
		department: { name: "Computer Science" },
		feeStructure: { registrationFee: 5000, fullFee: 85000 },
		thumbnailUrl: "/images/courses/course1.jpg",
	},
	// ... other mock courses
];

const mockEvents = [
	{
		_id: "1",
		title: "Annual Tech Symposium",
		description:
			"Join us for a day of technology talks, workshops, and networking opportunities with industry professionals.",
		eventDate: new Date("2023-04-15T09:00:00"),
		fileUrl: "#",
	},
	// ... other mock events
];

const mockTestimonials = [
	{
		_id: "1",
		title: "Rahul Sharma",
		description:
			"My experience at this college has been transformative. The faculty is supportive and the curriculum is industry-relevant. I secured a great job even before graduation!",
		thumbnailUrl: "/images/team/person1.jpg",
	},
	// ... other mock testimonials
];

export default Home;
