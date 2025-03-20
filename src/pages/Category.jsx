import React, { useState, useEffect } from 'react';
import {
	Box,
	Container,
	Grid,
	Typography,
	Card,
	CardContent,
	CardMedia,
	Button,
	Chip,
	CircularProgress,
	Breadcrumbs,
	Link,
	useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SchoolIcon from '@mui/icons-material/School';
import api from '../services/api';

// Styled components
const PageBanner = styled(Box)(({ theme }) => ({
	background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/banner22.jpg')`,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	padding: theme.spacing(10, 0),
	textAlign: 'center',
	color: '#fff',
}));

const CourseCard = styled(Card)(({ theme }) => ({
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	transition: 'transform 0.3s, box-shadow 0.3s',
	'&:hover': {
		transform: 'translateY(-8px)',
		boxShadow: theme.shadows[8],
	},
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
	position: 'absolute',
	top: 16,
	left: 16,
	backgroundColor: theme.palette.primary.main,
	color: '#fff',
	fontWeight: 'bold',
}));

const Category = () => {
	const { id } = useParams();
	const theme = useTheme();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [category, setCategory] = useState(null);
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		const fetchCategoryData = async () => {
			try {
				setLoading(true);
				
				// Fetch category details
				const categoryRes = await api.public.getCategories();
				
				// Extract data from response
				const categoriesData = categoryRes?.data || [];
				
				// Find the category with matching ID
				const categoryData = Array.isArray(categoriesData) ? 
					categoriesData.find(cat => cat._id === id) : null;
				
				if (categoryData) {
					setCategory(categoryData);
					
					// Fetch courses for this category
					const coursesRes = await api.public.getCourses();
					
					// Extract courses data from response
					const coursesData = coursesRes?.data || [];
					
					// Filter courses by category ID
					const categoryCourses = Array.isArray(coursesData) ? 
						coursesData.filter(course => 
							course.categoryId && course.categoryId._id === id
						) : [];
					
					setCourses(categoryCourses);
				} else {
					// Category not found
					navigate('/courses');
				}
				
				setLoading(false);
			} catch (error) {
				console.error('Error fetching category data:', error);
				setLoading(false);
				navigate('/courses');
			}
		};

		fetchCategoryData();
	}, [id, navigate]);

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
				<CircularProgress color="primary" />
			</Box>
		);
	}

	return (
		<Box>
			{/* Page Banner */}
			<PageBanner>
				<Container>
					<Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
						{category?.name || 'Category'}
					</Typography>
					<Breadcrumbs 
						separator={<NavigateNextIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.7)' }} />}
						aria-label="breadcrumb"
						sx={{ 
							display: 'flex', 
							justifyContent: 'center',
							'& .MuiBreadcrumbs-ol': {
								justifyContent: 'center',
							},
							'& a': {
								color: 'rgba(255,255,255,0.7)',
								'&:hover': {
									color: '#fff',
								},
							},
						}}
					>
						<Link component={RouterLink} to="/" color="inherit">
							Home
						</Link>
						<Link component={RouterLink} to="/courses" color="inherit">
							Courses
						</Link>
						<Typography color="#fff">{category?.name || 'Category'}</Typography>
					</Breadcrumbs>
				</Container>
			</PageBanner>

			{/* Courses Section */}
			<Container sx={{ py: 8 }}>
				<Box sx={{ mb: 6 }}>
					<Typography variant="h4" component="h2" gutterBottom>
						Courses in {category?.name || 'this category'}
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Explore our range of courses in the {category?.name || ''} category.
					</Typography>
				</Box>

				{courses.length > 0 ? (
					<Grid container spacing={4}>
						{courses.map((course, index) => (
							<Grid item xs={12} sm={6} md={4} key={course._id || index}>
								<CourseCard>
									<Box sx={{ position: 'relative' }}>
										<CardMedia
											component="img"
											height="200"
											image={course.thumbnailUrl || `/images/courses/course${(index % 4) + 1}.jpg`}
											alt={course.name}
										/>
										<CategoryChip 
											label={course.departmentId?.name || 'Department'} 
											size="small"
										/>
									</Box>
									<CardContent sx={{ flexGrow: 1 }}>
										<Typography variant="h6" component="h3" gutterBottom>
											{course.name}
										</Typography>
										<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
											<SchoolIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
											<Typography variant="body2" color="text.secondary">
												{course.departmentId?.name || 'Department'}
											</Typography>
										</Box>
										<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
											<Typography variant="subtitle1" fontWeight="bold" color="primary">
												₹{course.feeStructure?.fullFee?.toLocaleString() || 'Free'}
											</Typography>
											<Button 
												variant="outlined" 
												size="small" 
												component={RouterLink}
												to={`/courses/${course._id}`}
											>
												View Details
											</Button>
										</Box>
									</CardContent>
								</CourseCard>
							</Grid>
						))}
					</Grid>
				) : (
					<Box sx={{ textAlign: 'center', py: 5 }}>
						<Typography variant="h6" color="text.secondary">
							No courses available in this category at the moment.
						</Typography>
						<Button
							variant="contained"
							component={RouterLink}
							to="/courses"
							sx={{ mt: 3 }}
						>
							Browse All Courses
						</Button>
					</Box>
				)}
			</Container>
		</Box>
	);
};

export default Category; 