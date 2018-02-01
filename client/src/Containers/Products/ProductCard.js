import React, {Component} from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Button,
    Collapse,
    withStyles
} from "material-ui-next";
import { Carousel } from 'react-responsive-carousel';
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';


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

class ProductCard extends Component {

    state= {
        showDescription: false
    };

    triggerDescriptionHandler = () => {
        this.setState(prevState => {
            return {
                showDescription: !prevState.showDescription
            }
        })
    };

    render(){
        let {
            classes,
            selectedProduct: {
                title,
                vendorCode,
                images,
                description,
            }
        } = this.props;

        return (
            <Card>
                <div className={classes.content}>

                    <Carousel dynamicHeight>
                        {images.map((link, i) => (
                            <img key={i} src={link} alt="product" />
                        ))}
                    </Carousel>

                    <div className={classes.description}>
                        <CardHeader title={title} subheader={`Артикул: ${vendorCode}`} />
                        <CardContent>
                            <Button
                                className={classes.collapseButton}
                                fullWidth={true}
                                onClick={this.triggerDescriptionHandler}
                            >
                                Показать описание
                            </Button>
                            <Collapse in={this.state.showDescription}>
                                <div dangerouslySetInnerHTML={{__html: description}}/>
                            </Collapse>
                        </CardContent>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withStyles(styles)(ProductCard);