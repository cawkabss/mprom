import React, {Component} from 'react';
import {compose} from "recompose";
import {connect} from 'react-redux';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Paper,
    Typography,
    withStyles
} from 'material-ui-next';

import Wrapper from "../../../hoc/Wrapper";
import DataTable from "../../../UI/DataTable/DataTable";
import Progress from "../../../UI/Progress/Progress";
import {
    parsePriceFile,
    updateProviderProducts,
    confirmErrorHandler
} from "../../../AC/providers";
import withErrorHandler from "../../../hoc/WithErrorHandler";

const TABLE_COLUMNS = [
    {
        key: 'title',
        label: 'Название',
    },
    {
        key: 'vendorCode',
        label: 'Артикул'
    },
    {
        key: 'description',
        label: 'Описание',
    },
    {
        key: 'providerPrice',
        label: 'Опт. цена',
    },
    {
        key: 'recommendedPrice',
        label: 'Рек. цена',
    },
    {
        key: 'count',
        label: 'Остаток',
    }
];

const styles = {
    root: {
        padding: '0 15px'
    },

    paper: {
        padding: 15,
        textAlign: 'center'
    },

    marginBottom: {
        marginBottom: 15
    },

    actions: {
        marginTop: 15,
        textAlign: 'center'
    },

    fileButton: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },

    settingsItem: {
        marginBottom: 10,
        fontWeight: 600
    }
};

class PriceManager extends Component {

    state = {
        stepIndex: 0,
        canNext: false,
        priceFile: null,
        finished: false,
    };

    setProviderPriceFile = (event) => {
        this.setState({
            priceFile: event.target.files[0]
        })
    };

    handleNext = () => {
        const {stepIndex} = this.state;

        if (stepIndex === 0) {
            this.props.parsePriceFile(this.state.priceFile)
                .then(() => {
                    if (!this.props.error) {
                        this.setState({
                            stepIndex: stepIndex + 1,
                            finished: true
                        });
                    }
                })
        }

        if (stepIndex === 1) {
            this.props.updateProviderProducts()
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getAvailableSettingsList = () => {
        const settings = this.props.settings;

        const transformedSettings = [];

        for (let key in settings) {
            if (settings[key]) {
                switch (key) {
                    case 'titleCell':
                        transformedSettings.push({
                            key: 'Колонка с названием',
                            value: settings[key]
                        });
                        break;

                    case 'vendorCodeCell':
                        transformedSettings.push({
                            key: 'Колонка с артикулом',
                            value: settings[key]
                        });
                        break;

                    case 'priceCell':
                        transformedSettings.push({
                            key: 'Колонка с ценой',
                            value: settings[key]
                        });
                        break;

                    case 'recommendedPriceCell':
                        transformedSettings.push({
                            key: 'Колонка с рекомендованной ценой',
                            value: settings[key]
                        });
                        break;

                    case 'descriptionCell':
                        transformedSettings.push({
                            key: 'Колонка с описанием',
                            value: settings[key]
                        });
                        break;

                    case 'countCell':
                        transformedSettings.push({
                            key: 'Колонка с остатками',
                            value: settings[key]
                        });
                        break;
                    default: return;
                }
            }
        }
        return (
            <ul>
                {
                    transformedSettings.map(item => (
                        <li key={item.value}>{`${item.key}: ${item.value}`}</li>
                    ))
                }
            </ul>
        );
    };

    getStepContent(stepIndex) {

        const {
            parsedProducts,
            classes
        } = this.props;
        const priceFile = this.state.priceFile;

        switch (stepIndex) {
            case 0:
                return (
                    <Wrapper>
                        <Typography type="title" className={classes.marginBottom}>
                            <span>Загрузите Excel-файл со следующей конфигурацией:</span>
                        </Typography>
                        <Typography className={classes.marginBottom}>
                            *Вы можете изменить конфигурацию во вкладке "Изменить"
                        </Typography>
                        { this.getAvailableSettingsList() }
                        <Button
                            raised
                            className={classes.marginBottom}
                            color="secondary"
                        >
                            <input onChange={this.setProviderPriceFile}
                                   name="priceFile"
                                   type="file"
                                   className={classes.fileButton}/>
                            Прайс
                        </Button>
                        <p>{priceFile ? priceFile.name : 'Файл не загружен'}</p>
                    </Wrapper>
                );

            case 1:

                const transformedProducts = parsedProducts.map((product) => {
                    return {
                        title: product.title,
                        vendorCode: product.vendorCode,
                        providerPrice: product.price.providerPrice,
                        description: product.description.text.length > 70 ?
                            `${product.description.text.slice(0, 70)}...` :
                            product.description.text,
                        recommendedPrice: product.price.recommendedPrice,
                        count: product.count
                    }
                });

                return (
                    <Wrapper>
                        <Typography type="title" className={classes.marginBottom}>
                            <span>Сверьте данные</span>
                        </Typography>
                        <Typography className={classes.settingsItem}>
                            Найдено товаров: {parsedProducts.length} шт.
                        </Typography>
                        <DataTable
                            columns={TABLE_COLUMNS}
                            data={transformedProducts}
                            showPagination={true}
                            showRowHover={true}
                            rowsPerPageOptions={[10, 20, 50, 100]}
                        />
                    </Wrapper>
                );

            default:
                return;
        }
    }

    render() {
        const {stepIndex, priceFile} = this.state;
        const {loading, classes} = this.props;

        let canNext = true;

        if (stepIndex === 0) {
            canNext = !!priceFile;
        }

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Загрузка</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Проверка</StepLabel>
                        </Step>
                    </Stepper>

                    {this.getStepContent(stepIndex)}

                    <div className={classes.actions}>
                        <Button
                            disabled={stepIndex === 0}
                            onClick={this.handlePrev}
                            style={{marginRight: 12}}
                        >
                            Назад
                        </Button>
                        <Button
                            raised
                            color="primary"
                            disabled={!canNext}
                            onClick={this.handleNext}
                        >
                            {stepIndex === 2 ? 'Сохранить' : 'Дальше'}
                        </Button>
                    </div>
                </Paper>

                <Progress show={loading}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const providerForm = state.providers.form;

    return {
        settings: providerForm.data.settings,
        parsedProducts: providerForm.parsedProducts,
        loading: providerForm.loading,
        error: providerForm.error,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        parsePriceFile: (priceFile) => dispatch(parsePriceFile(priceFile)),
        confirmErrorHandler: () => dispatch(confirmErrorHandler()),
        updateProviderProducts: () => dispatch(updateProviderProducts())
    }
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withErrorHandler,
    withStyles(styles)
);

export default enhance(PriceManager);
