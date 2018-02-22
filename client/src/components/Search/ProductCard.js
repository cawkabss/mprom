import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Carousel} from 'react-responsive-carousel';
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import {
    Card,
    CardActions,
    CardHeader,
    CardContent,
    IconButton,
    Typography,
    Tooltip,
    withStyles, Icon
} from "material-ui-next";
import {green} from 'material-ui-next/colors';
import classNames from 'classnames';

import {chooseProductPart} from "../../AC/search";

const styles = {
    title: {
        fontSize: '1rem'
    },
    part: {
        position: 'relative',
        padding: '10px 0',

        '& iframe': {
            width: '100% !important'
        },

        '& ul': {
            listStyle: 'none !important'
        },

        '& img': {
            width: 'auto',
            maxWidth: '100% !important',
            height: 'auto !important'
        }
    },

    partHeading: {
        marginBottom: 10,
        fontWeight: 600
    },

    addButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        width: 'auto',
        height: 'auto',
        padding: '10px 0',
        color: green[500]
    },

    addButtonGallery: {
        right: '15px'
    },

    hidden: {
        display: 'none'
    },

    actions: {
        height: 'auto',
        flexDirection: 'column'
    }
};

class FinedProductItem extends Component {

    render() {
        const {
            product: {
                title,
                price,
                images,
                category,
                description,
                properties,
                keywords,
                vendorCode
            },
            showAddBtn,
            actions,
            chooseProductPart,
            classes
        } = this.props;

        return (
            <Card>
                <div className={classes.part}>
                    <CardHeader
                        classes={{title: classes.title}}
                        title={title}
                        subheader={vendorCode ? vendorCode : ''} />
                    <IconButton
                        className={
                            classNames(
                                classes.addButton,
                                classes.addButtonGallery,
                                showAddBtn ? classes.addButton : classes.hidden
                            )}
                        aria-label="Choose!"
                        onClick={() => chooseProductPart('title', title)}
                    >
                        <Icon className="material-icons">
                            add_circle
                        </Icon>
                    </IconButton>
                </div>
                <div className={classes.part}>
                    <Carousel>
                        {
                            images.map((link, i) => (<img key={i} src={link} alt="product"/>))
                        }
                    </Carousel>
                    <Tooltip placement="top-start" title="Выбрать">
                        <IconButton
                            className={
                                classNames(
                                    classes.addButton,
                                    classes.addButtonGallery,
                                    showAddBtn ? classes.addButton : classes.hidden
                                )}
                            aria-label="Choose!"
                            onClick={() => chooseProductPart('images', images)}
                        >
                            <Icon className="material-icons">
                                add_circle
                            </Icon>
                        </IconButton>
                    </Tooltip>
                </div>
                <hr/>
                <CardContent>
                    <div className={classes.part}>
                        <Typography type="subheading" className={classes.partHeading}>
                            Цена:
                        </Typography>
                        <Typography>
                            {actions ? price.ourPrice : price}
                        </Typography>
                    </div>
                    <hr/>
                    <div className={classes.part}>
                        <Typography type="subheading" className={classes.partHeading}>
                            Категория:
                        </Typography>
                        <a href={category.url}>{category.name}</a>
                        <IconButton
                            className={
                                classNames(
                                    classes.addButton,
                                    showAddBtn ? classes.addButton : classes.hidden
                                )}
                            aria-label="Choose!"
                            onClick={() => chooseProductPart('category', category)}
                        >
                            <Icon className="material-icons">
                                add_circle
                            </Icon>
                        </IconButton>
                    </div>
                    <hr/>
                    <div className={classes.part}>
                        <Typography type="subheading" className={classes.partHeading}>
                            Описание:
                        </Typography>

                        <div hidden={!description.html}>
                            <Typography dangerouslySetInnerHTML={{__html: description.html}}>

                            </Typography>
                            <IconButton
                                className={
                                    classNames(
                                        classes.addButton,
                                        showAddBtn ? classes.addButton : classes.hidden
                                    )}
                                aria-label="Choose!"
                                onClick={() => chooseProductPart('description', description)}
                            >
                                <Icon className="material-icons">
                                    add_circle
                                </Icon>
                            </IconButton>
                        </div>
                        <div hidden={description.html}>
                            <Typography>Пусто</Typography>
                        </div>
                    </div>
                    <hr/>
                    <div className={classes.part}>
                        <Typography type="subheading" className={classes.partHeading}>
                            Характеристики:
                        </Typography>

                        <div hidden={!properties.length}>
                            <IconButton
                                className={
                                    classNames(
                                        classes.addButton,
                                        showAddBtn ? classes.addButton : classes.hidden
                                    )}
                                aria-label="Choose!"
                                onClick={() => chooseProductPart('properties', properties)}
                            >
                                <Icon className="material-icons">
                                    add_circle
                                </Icon>
                            </IconButton>
                            <ul>
                                {properties.map((prop, index) => {
                                    return (
                                        <li key={index}>
                                            <Typography>
                                                {prop.key} ---- {prop.value}
                                            </Typography>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div hidden={properties.length}>
                            <Typography>Пусто</Typography>
                        </div>
                    </div>
                    <hr/>
                    <div className={classes.part}>
                        <Typography type="subheading" className={classes.partHeading}>
                            Ключевые слова:
                        </Typography>
                        <div hidden={!keywords}>
                            <IconButton className={
                                classNames(
                                    classes.addButton,
                                    showAddBtn ? classes.addButton : classes.hidden
                                )}
                                        aria-label="Choose!"
                                        onClick={() => chooseProductPart('keywords', keywords)}
                            >
                                <Icon className="material-icons">
                                    add_circle
                                </Icon>
                            </IconButton>
                            <Typography>
                                {keywords}
                            </Typography>
                        </div>
                        <div hidden={keywords}>
                            <Typography>Пусто</Typography>
                        </div>
                    </div>
                </CardContent>
                <CardActions className={classes.actions}>
                    {actions}
                </CardActions>
            </Card>
        );
    }
}

const mapDisPatchToProps = dispatch => {
    return {
        chooseProductPart: (partName, data) => dispatch(chooseProductPart(partName, data)),
    }
};

export default connect(null, mapDisPatchToProps)(withStyles(styles)(FinedProductItem));