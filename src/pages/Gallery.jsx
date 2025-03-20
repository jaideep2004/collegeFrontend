import React, { useState, useEffect } from 'react';
import {
	Box,
	Container,
	Grid,
	Typography,
	Card,
	CardMedia,
	CardContent,
	Button,
	Tabs,
	Tab,
	Fade,
	Dialog,
	DialogContent,
	IconButton,
	useTheme,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	CircularProgress,
	Paper,
	Snackbar,
	Alert,
	Skeleton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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

const GalleryCard = styled(Card)(({ theme }) => ({
	height: '100%',
	cursor: 'pointer',
	overflow: 'hidden',
	transition: 'transform 0.3s',
	'&:hover': {
		transform: 'scale(1.03)',
		'& .MuiCardMedia-root': {
			transform: 'scale(1.1)',
		},
	},
	'& .MuiCardMedia-root': {
		transition: 'transform 0.5s',
	},
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
	marginBottom: theme.spacing(4),
	'& .MuiTabs-indicator': {
		backgroundColor: theme.palette.primary.main,
		height: 3,
	},
	'& .MuiTab-root': {
		textTransform: 'none',
		fontWeight: 600,
		fontSize: '1rem',
		minWidth: 100,
		'&.Mui-selected': {
			color: theme.palette.primary.main,
		},
	},
}));

const DialogNavButton = styled(IconButton)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	transform: 'translateY(-50%)',
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	color: '#fff',
	'&:hover': {
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
	},
}));

const UploadButton = styled(Button)(({ theme }) => ({
	marginTop: theme.spacing(2),
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	'&:hover': {
		backgroundColor: theme.palette.primary.dark,
	},
	'&.Mui-disabled': {
		backgroundColor: theme.palette.action.disabledBackground,
	},
}));

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

const Gallery = () => {
	const theme = useTheme();
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const [images, setImages] = useState([]);
	const [filteredImages, setFilteredImages] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [openDialog, setOpenDialog] = useState(false);
	const [currentImage, setCurrentImage] = useState(null);
	const [openUploadDialog, setOpenUploadDialog] = useState(false);
	const [uploadForm, setUploadForm] = useState({
		title: '',
		category: '',
		file: null,
	});
	const [uploading, setUploading] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success',
	});
	const [page, setPage] = useState(1);
	const imagesPerPage = 12;
	const [role, setRole] = useState(localStorage.getItem('role') || 'user');

	useEffect(() => {
		const fetchImages = async () => {
			try {
				setLoading(true);
				
				// Fetch gallery categories first
				const categoriesResponse = await api.public.getContentByType('gallery-category');
				console.log('Gallery categories:', categoriesResponse);
				
				let galleryCategories = [];
				if (Array.isArray(categoriesResponse)) {
					galleryCategories = categoriesResponse;
				} else if (categoriesResponse?.data && Array.isArray(categoriesResponse.data)) {
					galleryCategories = categoriesResponse.data;
				}
				
				// Set categories with 'All' as the first option
				setCategories([
					{ id: 'all', name: 'All' },
					...galleryCategories.map(cat => ({ 
						id: cat._id, 
						name: cat.title,
						thumbnail: cat.thumbnailUrl || cat.fileUrl
					}))
				]);
				
				// Fetch gallery images
				const imagesResponse = await api.public.getContentByType('gallery');
				console.log('Gallery images:', imagesResponse);
				
				let galleryImages = [];
				if (Array.isArray(imagesResponse)) {
					galleryImages = imagesResponse;
				} else if (imagesResponse?.data && Array.isArray(imagesResponse.data)) {
					galleryImages = imagesResponse.data;
				}
				
				// Process images with category information
				const processedImages = galleryImages.map(item => ({
					id: item._id,
					src: item.fileUrl,
					thumbnail: item.thumbnailUrl || item.fileUrl,
					title: item.title || 'Gallery Image',
					description: item.description || '',
					categoryId: item.category || 'uncategorized',
					categoryName: galleryCategories.find(cat => cat._id === item.category)?.title || 'Uncategorized',
					uploadedAt: item.uploadedAt
				}));
				
				setImages(processedImages);
				setFilteredImages(processedImages);
				
				setLoading(false);
			} catch (error) {
				console.error('Error fetching gallery images:', error);
				
				// Show empty state on error
				setCategories([{ id: 'all', name: 'All' }]);
				setImages([]);
				setFilteredImages([]);
				setLoading(false);
				
				// Show error message
				setSnackbar({
					open: true,
					message: 'Failed to load gallery images. Please try again later.',
					severity: 'error'
				});
			}
		};

		fetchImages();
	}, []);

	// Filter images when category changes
	useEffect(() => {
		if (Array.isArray(images)) {
			if (selectedCategory === 'all') {
				setFilteredImages(images);
			} else {
				const filtered = images.filter(img => img.categoryId === selectedCategory);
				setFilteredImages(filtered);
			}
			setPage(1);
		} else {
			setFilteredImages([]);
		}
	}, [selectedCategory, images]);

	const handleTabChange = (event, newValue) => {
		setSelectedCategory(newValue);
	};

	const handleOpenImage = (image) => {
		setCurrentImage(image);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handlePrevImage = () => {
		const currentIndex = filteredImages.findIndex(img => img._id === currentImage._id);
		const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
		setCurrentImage(filteredImages[prevIndex]);
	};

	const handleNextImage = () => {
		const currentIndex = filteredImages.findIndex(img => img._id === currentImage._id);
		const nextIndex = (currentIndex + 1) % filteredImages.length;
		setCurrentImage(filteredImages[nextIndex]);
	};

	const handleOpenUploadDialog = () => {
		setOpenUploadDialog(true);
	};

	const handleCloseUploadDialog = () => {
		setOpenUploadDialog(false);
		setUploadForm({
			title: '',
			category: '',
			file: null,
		});
	};

	const handleUploadFormChange = (e) => {
		const { name, value } = e.target;
		setUploadForm(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setUploadForm(prev => ({
				...prev,
				file: e.target.files[0],
			}));
		}
	};

	const handleUploadSubmit = async (e) => {
		e.preventDefault();
		
		if (!uploadForm.file) {
			setSnackbar({
				open: true,
				message: 'Please select a file to upload',
				severity: 'error'
			});
			return;
		}
		
		try {
			setUploading(true);
			
			// Create FormData object
			const formData = new FormData();
			formData.append('file', uploadForm.file);
			formData.append('type', 'gallery');
			formData.append('title', uploadForm.category ? `${uploadForm.category} - ${uploadForm.title}` : uploadForm.title);
			
			// Upload the file
			const response = await api.admin.uploadFile(formData);
			
			if (response) {
				// Add the new content
				await api.admin.addContent({
					type: 'gallery',
					title: uploadForm.category ? `${uploadForm.category} - ${uploadForm.title}` : uploadForm.title,
					fileUrl: response.fileUrl,
					thumbnailUrl: response.fileUrl, // Use same URL for thumbnail
				});
				
				// Show success message
				setSnackbar({
					open: true,
					message: 'Image uploaded successfully!',
					severity: 'success'
				});
				
				// Close dialog and reset form
				setOpenUploadDialog(false);
				setUploadForm({
					title: '',
					category: '',
					file: null,
				});
				
				// Refresh gallery
				const galleryResponse = await api.public.getGallery();
				
				// Extract gallery data from response
				const galleryData = galleryResponse?.data || [];
				
				if (Array.isArray(galleryData) && galleryData.length > 0) {
					// Map the API data to the format needed for the gallery
					const processedImages = galleryData.map(item => ({
						id: item._id,
						src: item.fileUrl,
						thumbnail: item.thumbnailUrl || item.fileUrl,
						title: item.title || 'Gallery Image',
						description: item.description || '',
						category: item.title ? item.title.split('-')[0].trim() : 'Uncategorized',
						uploadedAt: item.uploadedAt
					}));
					
					setImages(processedImages);
					setFilteredImages(processedImages.filter(img => 
						selectedCategory === 'all' || 
						img.category === selectedCategory
					));
				}
			}
		} catch (error) {
			console.error('Error uploading image:', error);
			setSnackbar({
				open: true,
				message: 'Failed to upload image. Please try again.',
				severity: 'error'
			});
		} finally {
			setUploading(false);
		}
	};

	const handleLoadMore = () => {
		setPage(prev => prev + 1);
	};

	const handleCloseSnackbar = () => {
		setSnackbar(prev => ({ ...prev, open: false }));
	};

	// Calculate pagination
	const displayedImages = filteredImages.slice(0, page * imagesPerPage);
	const hasMore = displayedImages.length < filteredImages.length;

	return (
		<Box sx={{ fontFamily: 'Poppins, sans-serif' }}>
			{/* Banner Section */}
			<PageBanner>
				<Container>
					<Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
						Our Gallery
					</Typography>
					<Typography variant="h6" sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}>
						Explore our campus life, events, and student activities through our photo gallery.
					</Typography>
				</Container>
			</PageBanner>

			{/* Gallery Section */}
			<Container sx={{ py: 8 }}>
				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
						<CircularProgress />
					</Box>
				) : (
					<>
						{/* Category Tabs */}
						<StyledTabs
							value={selectedCategory}
							onChange={handleTabChange}
							variant="scrollable"
							scrollButtons="auto"
							allowScrollButtonsMobile
							centered
						>
							{categories.map((category) => (
								<Tab key={category.id} label={category.name} value={category.id} />
							))}
						</StyledTabs>

						{/* Gallery Grid */}
						<Grid container spacing={3}>
							{loading ? (
								// Loading skeletons
								Array.from(new Array(8)).map((_, index) => (
									<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
										<Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1 }} />
									</Grid>
								))
							) : Array.isArray(filteredImages) && filteredImages.length > 0 ? (
								// Gallery images
								filteredImages.slice(0, page * imagesPerPage).map((image, index) => (
									<Grid item xs={12} sm={6} md={4} lg={3} key={image.id || index}>
										<GalleryCard onClick={() => handleOpenImage(image)}>
											<CardMedia
												component="img"
												height={200}
												image={image.thumbnail || image.src}
												alt={image.title}
											/>
										</GalleryCard>
									</Grid>
								))
							) : (
								// No images found
								<Grid item xs={12}>
									<Box sx={{ textAlign: 'center', py: 5 }}>
										<Typography variant="h6" color="text.secondary">
											No images found in this category.
										</Typography>
										{role === 'admin' && (
											<Button
												variant="contained"
												startIcon={<AddPhotoAlternateIcon />}
												onClick={handleOpenUploadDialog}
												sx={{ mt: 2 }}
											>
												Add Images
											</Button>
										)}
									</Box>
								</Grid>
							)}
						</Grid>

						{/* Load More Button */}
						{hasMore && (
							<Box sx={{ textAlign: 'center', mt: 6 }}>
								<Button
									variant="outlined"
									size="large"
									onClick={handleLoadMore}
								>
									Load More
								</Button>
							</Box>
						)}

						{/* Upload Button (for admin) */}
						{localStorage.getItem('role') === 'admin' && (
							<Box sx={{ position: 'fixed', bottom: 30, right: 30 }}>
								<Button
									variant="contained"
									color="primary"
									startIcon={<AddPhotoAlternateIcon />}
									onClick={handleOpenUploadDialog}
									sx={{ borderRadius: 30, px: 3 }}
								>
									Add Photo
								</Button>
							</Box>
						)}
					</>
				)}
			</Container>

			{/* Image Dialog */}
			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				maxWidth="lg"
				fullWidth
			>
				<DialogContent sx={{ p: 0, position: 'relative' }}>
					<IconButton
						onClick={handleCloseDialog}
						sx={{
							position: 'absolute',
							top: 8,
							right: 8,
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							color: '#fff',
							zIndex: 1,
							'&:hover': {
								backgroundColor: 'rgba(0, 0, 0, 0.7)',
							},
						}}
					>
						<CloseIcon />
					</IconButton>

					{currentImage && (
						<>
							<Box
								component="img"
								src={currentImage.fileUrl || currentImage.thumbnailUrl || `/images/gallery/gallery1.jpg`}
								alt={currentImage.title}
								sx={{
									width: '100%',
									height: 'auto',
									maxHeight: '80vh',
									objectFit: 'contain',
								}}
							/>

							<DialogNavButton
								onClick={handlePrevImage}
								sx={{ left: 16 }}
							>
								<ArrowBackIosNewIcon />
							</DialogNavButton>

							<DialogNavButton
								onClick={handleNextImage}
								sx={{ right: 16 }}
							>
								<ArrowForwardIosIcon />
							</DialogNavButton>

							<Box sx={{ p: 2 }}>
								<Typography variant="h6" gutterBottom>
									{currentImage.title}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{currentImage.categoryName}
								</Typography>
							</Box>
						</>
					)}
				</DialogContent>
			</Dialog>

			{/* Upload Dialog */}
			<Dialog
				open={openUploadDialog}
				onClose={handleCloseUploadDialog}
				maxWidth="sm"
				fullWidth
			>
				<DialogContent>
					<Typography variant="h6" gutterBottom>
						Upload New Photo
					</Typography>

					<form onSubmit={handleUploadSubmit}>
						<TextField
							fullWidth
							label="Title"
							name="title"
							value={uploadForm.title}
							onChange={handleUploadFormChange}
							margin="normal"
							required
						/>

						<FormControl fullWidth margin="normal" required>
							<InputLabel>Category</InputLabel>
							<Select
								name="category"
								value={uploadForm.category}
								onChange={handleUploadFormChange}
								label="Category"
							>
								{categories
									.filter(cat => cat.id !== 'all')
									.map(category => (
										<MenuItem key={category.id} value={category.id}>
											{category.name}
										</MenuItem>
									))}
							</Select>
						</FormControl>

						<Box
							sx={{
								border: '2px dashed',
								borderColor: 'divider',
								borderRadius: 1,
								p: 3,
								mt: 2,
								textAlign: 'center',
							}}
						>
							{uploadForm.file ? (
								<Box>
									<Typography variant="body2" gutterBottom>
										{uploadForm.file.name}
									</Typography>
									<Button
										size="small"
										onClick={() => setUploadForm(prev => ({ ...prev, file: null }))}
									>
										Remove
									</Button>
								</Box>
							) : (
								<>
									<input
										accept="image/*"
										id="upload-image"
										type="file"
										onChange={handleFileChange}
										style={{ display: 'none' }}
									/>
									<label htmlFor="upload-image">
										<Button
											component="span"
											startIcon={<CloudUploadIcon />}
										>
											Select Image
										</Button>
									</label>
									<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
										Drag and drop or click to select
									</Typography>
								</>
							)}
						</Box>

						<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
							<Button
								onClick={handleCloseUploadDialog}
								sx={{ mr: 1 }}
							>
								Cancel
							</Button>
							<UploadButton
								type="submit"
								variant="contained"
								disabled={uploading || !uploadForm.title || !uploadForm.category || !uploadForm.file}
							>
								{uploading ? <CircularProgress size={24} /> : 'Upload'}
							</UploadButton>
						</Box>
					</form>
				</DialogContent>
			</Dialog>

			{/* Snackbar for notifications */}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					variant="filled"
					sx={{ width: '100%' }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default Gallery;
