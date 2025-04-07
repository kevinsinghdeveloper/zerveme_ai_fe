import React, {useEffect, useState} from "react";
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Card,
    CardContent,
    Avatar,
    Grid,
    Button,
    TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import "./ProfilePageStyles.css";
import {useUserContext} from "../../../context_providers/UserContext";

const ProfilePage: React.FC = () => {
    const {currentUser, loading, error, getCurrentUser, updateUser} = useUserContext();

    // Fetch current user data when the component mounts
    useEffect(() => {
        if (!currentUser) {
            getCurrentUser(); // Fetch current user if not already fetched
        }
    }, [currentUser, getCurrentUser]);

    // State for managing form data
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [primaryPhone, setPrimaryPhone] = useState<string>("");
    const [secondaryPhone, setSecondaryPhone] = useState<string>("");
    const [address1, setAddress1] = useState<string>("");
    const [address2, setAddress2] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [zipCode, setZipCode] = useState<string>("");
    const [country, setCountry] = useState<string>("");

    // Only set state if currentUser is available
    useEffect(() => {
        if (currentUser) {
            setUserName(currentUser.UserName || "");
            setEmail(currentUser.Email || "");
            setFirstName(currentUser.FirstName || "");
            setLastName(currentUser.LastName || "");
            setPrimaryPhone(currentUser.PrimaryPhone || "");
            setSecondaryPhone(currentUser.SecondaryPhone || "");
            setAddress1(currentUser.Address1 || "");
            setAddress2(currentUser.Address2 || "");
            setCity(currentUser.City || "");
            setState(currentUser.State || "");
            setZipCode(currentUser.ZipCode || "");
            setCountry(currentUser.Country || "");
        }
    }, [currentUser]); // Only run when currentUser changes

    // Handler for form submit
    // Update the handleSave function in the ProfilePage component
    const handleSave = () => {
        if (!currentUser) return;

        // Create an updated user object based on form values
        const updatedUser = {
            ...currentUser,
            Email: email,
            FirstName: firstName,
            LastName: lastName,
            PrimaryPhone: primaryPhone,
            SecondaryPhone: secondaryPhone,
            Address1: address1,
            Address2: address2,
            City: city,
            State: state,
            ZipCode: zipCode,
            Country: country
        };

        // Call the update user function from context
        updateUser(updatedUser);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar style={{backgroundColor: "#7b6df6"}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="back"
                        sx={{mr: 2}}
                        onClick={() => window.history.back()}  // This will take the user back to the previous page
                    >
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Back
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{p: 4}}>
                <Card sx={{maxWidth: 600, mx: "auto", p: 3, boxShadow: 3}}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar
                                alt="User Name"
                                src="https://i.pravatar.cc/150?img=3"
                                sx={{width: 80, height: 80}}
                            />
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h5">Edit Profile</Typography>
                        </Grid>
                    </Grid>

                    <CardContent>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <TextField
                                label="User Name"
                                variant="outlined"
                                fullWidth
                                value={userName}
                                InputProps={{
                                    readOnly: true, // Ensures the input is read-only
                                    disabled: true
                                }}
                                onChange={(e) => setUserName(e.target.value)}
                                sx={{mb: 2}}
                            />

                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{mb: 2}}
                            />

                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                sx={{mb: 2}}
                            />

                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                sx={{mb: 2}}
                            />
                            

                            <TextField
                                label="Primary Phone"
                                variant="outlined"
                                fullWidth
                                value={primaryPhone}
                                onChange={(e) => setPrimaryPhone(e.target.value)}
                                sx={{mb: 2}}
                            />

                            <TextField
                                label="Secondary Phone"
                                variant="outlined"
                                fullWidth
                                value={secondaryPhone}
                                onChange={(e) => setSecondaryPhone(e.target.value)}
                                sx={{mb: 2}}
                            />

                            <TextField
                                label="Address Line 1"
                                variant="outlined"
                                fullWidth
                                value={address1}
                                onChange={(e) => setAddress1(e.target.value)}
                                sx={{mb: 2}}
                            />

                            <TextField
                                label="Address Line 2"
                                variant="outlined"
                                fullWidth
                                value={address2}
                                onChange={(e) => setAddress2(e.target.value)}
                                sx={{mb: 2}}
                            />

                            <TextField
                                label="City"
                                variant="outlined"
                                fullWidth
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                sx={{mb: 2}}
                            />

                            <TextField
                                label="State"
                                variant="outlined"
                                fullWidth
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                sx={{mb: 2}}
                            />

                            <TextField
                                label="Zip Code"
                                variant="outlined"
                                fullWidth
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                sx={{mb: 2}}
                            />

                            <TextField
                                label="Country"
                                variant="outlined"
                                fullWidth
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                sx={{mb: 2}}
                            />

                            <Box display="flex" justifyContent="flex-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<EditIcon/>}
                                    onClick={handleSave}
                                >
                                    Save Changes
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default ProfilePage;