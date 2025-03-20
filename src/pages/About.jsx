import React from "react";
import {
	Box,
	Container,
	Grid,
	Typography,
	Button,
	Card,
	CardContent,
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarIcon from "@mui/icons-material/Star";

// Styled components
const PageBanner = styled(Box)(({ theme }) => ({
	background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/image-4.jpg')`,
	backgroundSize: "cover",
	backgroundPosition: " center",
	padding: theme.spacing(25, 0, 20, 0),
	textAlign: "center",
	color: "#fff",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
	position: "relative",
	marginBottom: theme.spacing(6),
	fontWeight: "bold",
	"&:after": {
		content: '""',
		position: "absolute",
		bottom: -16,
		left: 0,
		width: 80,
		height: 4,
		backgroundColor: theme.palette.primary.main,
	},
}));

const ValueCard = styled(Card)(({ theme }) => ({
	height: "100%",
	transition: "transform 0.3s, box-shadow 0.3s",
	"&:hover": {
		transform: "translateY(-10px)",
		boxShadow: theme.shadows[10],
	},
}));

const TeamMemberCard = styled(Card)(({ theme }) => ({
	height: "100%",
	textAlign: "center",
	transition: "transform 0.3s",
	"&:hover": {
		transform: "translateY(-8px)",
	},
}));

const TeamMemberAvatar = styled(Avatar)(({ theme }) => ({
	width: 120,
	height: 120,
	margin: "0 auto",
	marginTop: theme.spacing(-6),
	border: `4px solid ${theme.palette.background.paper}`,
	boxShadow: theme.shadows[3],
}));

const About = () => {
	const theme = useTheme();

	// Mock data for team members
	const teamMembers = [
		{
			name: "Dr. Sarah Johnson",
			position: "Principal",
			image: "/images/faculty1.jpg",
			description:
				"Ph.D in Education with over 20 years of experience in academic leadership.",
		},
		{
			name: "Prof. Michael Chen",
			position: "Dean of Sciences",
			image: "/images/faculty2.jpg",
			description:
				"Award-winning researcher with expertise in computational physics.",
		},
		{
			name: "Dr. Emily Rodriguez",
			position: "Head of Student Affairs",
			image: "/images/faculty3.jpg",
			description:
				"Dedicated to creating an inclusive and supportive environment for all students.",
		},
		{
			name: "Prof. James Wilson",
			position: "Dean of Arts",
			image: "/images/faculty4.jpg",
			description:
				"Renowned author and advocate for humanities in higher education.",
		},
	];

	return (
		<Box>
			{/* Banner Section */}
			<PageBanner>
				<Container>
					<Typography
						variant='h3'
						component='h1'
						gutterBottom
						fontWeight='bold'>
						About Our College
					</Typography>
					<Typography variant='h6' sx={{ maxWidth: 800, mx: "auto", mb: 4 }}>
						Empowering students with knowledge, skills, and values to excel in a
						rapidly changing world.
					</Typography>
				</Container>
			</PageBanner>

			{/* Our Story Section */}
			<Container sx={{ py: 8 }}>
				<Grid container spacing={6} alignItems='center'>
					<Grid item xs={12} md={6}>
						<Box
							component='img'
							src='/images/a3.jpg'
							alt='College History'
							sx={{
								width: "100%",
								borderRadius: 2,
								boxShadow: theme.shadows[5],
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<SectionTitle variant='h4' component='h2'>
							Our Story
						</SectionTitle>
						<Typography variant='body1' paragraph>
							Founded in 1985, our college has grown from a small institution
							with just three departments to a comprehensive educational center
							offering diverse programs across multiple disciplines.
						</Typography>
						<Typography variant='body1' paragraph>
							Over the decades, we have maintained our commitment to academic
							excellence while adapting to the changing needs of society and
							industry. Our graduates have gone on to make significant
							contributions in various fields both nationally and
							internationally.
						</Typography>
						<Typography variant='body1' paragraph>
							Today, we continue to build on our rich heritage while embracing
							innovation in teaching, research, and community engagement.
						</Typography>
						<Button
							variant='contained'
							color='primary'
							size='large'
							sx={{ mt: 2 }}>
							Explore
						</Button>
					</Grid>
				</Grid>
			</Container>

			{/* Our Values Section */}
			<Box sx={{ bgcolor: "grey.50", py: 8 }}>
				<Container>
					<Typography
						variant='h4'
						component='h2'
						fontWeight='bold'
						textAlign='center'
						gutterBottom>
						Our Core Values
					</Typography>
					<Typography
						variant='body1'
						textAlign='center'
						sx={{ maxWidth: 800, mx: "auto", mb: 6 }}>
						These principles guide our decisions, shape our culture, and define
						our approach to education.
					</Typography>

					<Grid container spacing={4}>
						<Grid item xs={12} sm={6} md={3}>
							<ValueCard>
								<CardContent sx={{ textAlign: "center", py: 4 }}>
									<Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
										<StarIcon sx={{ fontSize: 50 }} />
									</Box>
									<Typography
										variant='h6'
										component='h3'
										gutterBottom
										fontWeight='bold'>
										Excellence
									</Typography>
									<Typography variant='body2'>
										We strive for the highest standards in all our academic and
										administrative endeavors.
									</Typography>
								</CardContent>
							</ValueCard>
						</Grid>

						<Grid item xs={12} sm={6} md={3}>
							<ValueCard>
								<CardContent sx={{ textAlign: "center", py: 4 }}>
									<Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
										<GroupsIcon sx={{ fontSize: 50 }} />
									</Box>
									<Typography
										variant='h6'
										component='h3'
										gutterBottom
										fontWeight='bold'>
										Inclusivity
									</Typography>
									<Typography variant='body2'>
										We embrace diversity and ensure equal opportunities for all
										members of our community.
									</Typography>
								</CardContent>
							</ValueCard>
						</Grid>

						<Grid item xs={12} sm={6} md={3}>
							<ValueCard>
								<CardContent sx={{ textAlign: "center", py: 4 }}>
									<Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
										<MenuBookIcon sx={{ fontSize: 50 }} />
									</Box>
									<Typography
										variant='h6'
										component='h3'
										gutterBottom
										fontWeight='bold'>
										Innovation
									</Typography>
									<Typography variant='body2'>
										We encourage creative thinking and novel approaches to
										teaching and learning.
									</Typography>
								</CardContent>
							</ValueCard>
						</Grid>

						<Grid item xs={12} sm={6} md={3}>
							<ValueCard>
								<CardContent sx={{ textAlign: "center", py: 4 }}>
									<Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
										<EmojiEventsIcon sx={{ fontSize: 50 }} />
									</Box>
									<Typography
										variant='h6'
										component='h3'
										gutterBottom
										fontWeight='bold'>
										Integrity
									</Typography>
									<Typography variant='body2'>
										We uphold ethical standards and promote honesty and
										transparency in all interactions.
									</Typography>
								</CardContent>
							</ValueCard>
						</Grid>
					</Grid>
				</Container>
			</Box>

			{/* Why Choose Us Section */}
			<Container sx={{ py: 8 }}>
				<Grid container spacing={6} alignItems='center'>
					<Grid item xs={12} md={6}>
						<SectionTitle variant='h4' component='h2'>
							Why Choose Us
						</SectionTitle>
						<Typography variant='body1' paragraph>
							Our institution stands out for its commitment to providing a
							holistic educational experience that prepares students for success
							in their chosen fields and in life.
						</Typography>

						<List>
							{[
								"Experienced faculty with industry expertise",
								"State-of-the-art facilities and resources",
								"Diverse and inclusive learning environment",
								"Strong industry partnerships and internship opportunities",
								"Comprehensive student support services",
								"Active research culture and innovation centers",
							].map((item, index) => (
								<ListItem key={index} disableGutters>
									<ListItemIcon>
										<CheckCircleIcon color='primary' />
									</ListItemIcon>
									<ListItemText primary={item} />
								</ListItem>
							))}
						</List>

						<Button
							variant='outlined'
							color='primary'
							size='large'
							sx={{ mt: 2 }}>
							Apply Now
						</Button>
					</Grid>
					<Grid item xs={12} md={6}>
						<Box
							component='img'
							src='/images/a5.jpg'
							alt='Campus Life'
							sx={{
								width: "100%",
								borderRadius: 2,
								boxShadow: theme.shadows[5],
							}}
						/>
					</Grid>
				</Grid>
			</Container>

			{/* Leadership Team Section */}
			<Box sx={{ bgcolor: "grey.50", py: 8 }}>
				<Container>
					<Typography
						variant='h4'
						component='h2'
						fontWeight='bold'
						textAlign='center'
						gutterBottom>
						Our Leadership Team
					</Typography>
					<Typography
						variant='body1'
						textAlign='center'
						sx={{ maxWidth: 800, mx: "auto", mb: 6 }}>
						Meet the dedicated professionals who guide our institution's vision
						and operations.
					</Typography>

					<Grid container spacing={4}>
						{teamMembers.map((member, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Box sx={{ position: "relative", mt: 6 }}>
									<TeamMemberCard style={{ paddingTop: "50px" }}>
										<TeamMemberAvatar src={member.image} alt={member.name} />
										<CardContent sx={{ pt: 4 }}>
											<Typography variant='h6' component='h3' gutterBottom>
												{member.name}
											</Typography>
											<Typography
												variant='subtitle2'
												color='primary'
												gutterBottom>
												{member.position}
											</Typography>
											<Divider sx={{ my: 2 }} />
											<Typography variant='body2'>
												{member.description}
											</Typography>
										</CardContent>
									</TeamMemberCard>
								</Box>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>

			{/* Call to Action Section */}
			<Box
				sx={{
					background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/images/campus3.jpg')`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					py: 8,
					color: "white",
					textAlign: "center",
				}}>
				<Container>
					<SchoolIcon
						sx={{ fontSize: 60, mb: 3, color: theme.palette.primary.main }}
					/>
					<Typography
						variant='h4'
						component='h2'
						gutterBottom
						fontWeight='bold'>
						Ready to Join Our Community?
					</Typography>
					<Typography variant='body1' sx={{ maxWidth: 800, mx: "auto", mb: 4 }}>
						Take the first step towards a transformative educational experience.
						Apply now for the upcoming academic session.
					</Typography>
					<Box>
						<Button
							variant='contained'
							color='primary'
							size='large'
							sx={{ mr: 2 }}>
							Apply Now
						</Button>
						<Button
							variant='outlined'
							sx={{
								color: "white",
								borderColor: "white",
								"&:hover": {
									borderColor: theme.palette.primary.main,
									backgroundColor: "rgba(255, 255, 255, 0.1)",
								},
							}}
							size='large'>
							Contact Us
						</Button>
					</Box>
				</Container>
			</Box>
		</Box>
	);
};

export default About;
