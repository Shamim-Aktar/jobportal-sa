import React from 'react'
import { Typography, TextField, Stack, Badge, Card } from '@mui/material'

const LatestJobCards = () => {
    return (
        <>
            <Card variant="outlined" sx={{ maxWidth: 400 }}>
                <Typography level="h1">Company Name</Typography>
                <Typography level="h2" sx={{ fontSize: 'xl', mb: 0.5 }}>
                    India
                </Typography>
                <h1>Job Title</h1>
                <Typography>
                    Yosemite National Park is a national park spanning 747,956 acres (1,169.4 sq
                    mi; 3,025.2 km2) in the western Sierra Nevada of Central California.
                </Typography>
            </Card>

            <Stack direction="row" spacing={12}>
                <Badge badgeContent={'12 position'} color="primary"></Badge>
                <Badge badgeContent={'part time'} color="primary"></Badge>
                <Badge badgeContent={'24 lpa'} color="primary"></Badge>
            </Stack>
        </>
    )
}

export default LatestJobCards