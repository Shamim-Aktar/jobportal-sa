import React from 'react';
import { Card, CardContent, Typography, FormControlLabel, RadioGroup, Radio } from '@mui/material';

const filterData = [
    {
        filterType: "Location",
        array: ['Delhi', 'Noida', 'Bangalore', 'Pune', "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ['Software', 'Automobile', 'Developer', 'Ecommerce', "Travel"]
    },
    {
        filterType: "Salary",
        array: ['0-40k', '42-1lakh', '1 lakh to 50lakh']
    },
];

const Filtercard = () => {
    return (
        <div>
            <Card raised={true} sx={{ padding: 2, marginBottom: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Filters
                    </Typography>
                    {filterData.map((data, index) => (
                        <div key={index}>
                            <Typography variant='subtitle1'>
                                {data.filterType}
                            </Typography>
                            <RadioGroup name={data.filterType}>
                                {data.array.map((option, idx) => (
                                    <FormControlLabel
                                        key={idx}
                                        value={option}
                                        control={<Radio />}
                                        label={option}
                                    />
                                ))}
                            </RadioGroup>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

export default Filtercard;
