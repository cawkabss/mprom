import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Button,
    Collapse,
    withStyles
} from "material-ui-next";
import {Carousel} from 'react-responsive-carousel';
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import {compose, withState} from "recompose";


const styles = theme => (
    {
        content: {
            display: 'flex',
            flexDirection: 'column',

            '& img': {
                maxWidth: '100%'
            },

            [theme.breakpoints.up('md')]: {
                flexDirection: 'row'
            }
        },

        description: {
            width: '100%',
            maxWidth: '100%',

            [theme.breakpoints.up('md')]: {
                maxWidth: '60%'
            }
        },

        collapseButton: {
            marginBottom: 10
        }
    }
);

const ProductCard = (props) => {
    const {
        classes,
        selectedProduct: {
            title,
            vendorCode,
            images,
            description,
        },
        showDescription,
        toggleDescription
    } = props;

    return (
        <Card>
            <div className={classes.content}>
                <Carousel dynamicHeight>
                    {
                        images.map((link, i) => (
                            <img key={i} src={link} alt="product"/>
                        ))
                    }
                </Carousel>
                <div className={classes.description}>
                    <CardHeader title={title} subheader={`Артикул: ${vendorCode}`}/>
                    <CardContent>
                        <Button
                            className={classes.collapseButton}
                            fullWidth={true}
                            onClick={() => toggleDescription(!showDescription)}
                        >
                            Показать описание
                        </Button>
                        <Collapse in={showDescription}>
                            <div dangerouslySetInnerHTML={{__html: description}}/>
                        </Collapse>
                    </CardContent>
                </div>
            </div>
        </Card>
    )
};

const showDescription = withState('showDescription', 'toggleDescription', false);

const enhance = compose(
    showDescription,
    withStyles(styles)
);

export default enhance(ProductCard);