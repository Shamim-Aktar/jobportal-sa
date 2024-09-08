import React from 'react'
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

const CategoryCarousel = () => {

    const category = [
        "Frontend Developer",
        "Backend Developer",
        "Data Science"
    ]
    return (
        <div>CategoryCarousel


            <Carousel>
                {
                    category.map((item, i) =>
                        <Paper key={i}>

                            <Button className="CheckButton">
                                {item}
                            </Button>
                        </Paper>
                    )
                }
            </Carousel>
        </div>
    )
}

export default CategoryCarousel