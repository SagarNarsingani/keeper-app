import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as React from 'react';
import qs from 'qs';

const theme = createTheme();

export default function CreateNote({ user, posts, setPosts, setOpenPopup }) {
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const note = {
            id: user._id,
            title: data.get('title'),
            content: data.get('content'),
        };

        const noteData = await fetch('https://keeper-app-back.onrender.com/user/post', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: qs.stringify(note),
        });

        const json = await noteData.json();

        setPosts((posts) => [...posts, { ...note, id: json._id }]);
        setOpenPopup(false);
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 3,
                        marginBottom: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 3 }}
                        onSubmit={handleSubmit}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    // sx={{
                                    //     marginRight: 6,
                                    // }}
                                    autoFocus
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    name="title"
                                    autoComplete="title"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    // sx={{
                                    //     marginRight: 6,
                                    // }}
                                    multiline={true}
                                    rows={10}
                                    required
                                    fullWidth
                                    name="content"
                                    label="Take a Note"
                                    id="content"
                                    autoComplete="content"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
