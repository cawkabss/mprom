import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
    Step,
    Stepper,
    StepLabel,
    Button,
    TextField,
    Typography
} from 'material-ui-next';

import Wrapper from "../../../hoc/Wrapper";
import {search} from '../../../store/actions/search/actions';

const styles = {
    root: {
        width: '100%',
        maxWidth: 700,
        margin: 'auto'
    },

    content: {
        margin: '0 16px',
        textAlign: 'center'
    }
};

class Captcha extends Component {

    state = {
        finished: false,
        stepIndex: 0,
        cookie: ''
    };

    setCookieHandler = (event) => {
        this.setState({
            cookie: event.target.value
        })
    };

    handleNext = () => {
        const {stepIndex} = this.state;

        if (stepIndex === 1) {
            localStorage.setItem('cookie', this.state.cookie);

            const {parseQuery, maxCount} = this.props.settings;
            const query = this.props.result[parseQuery];

            this.props.search(query, maxCount);
            this.props.history.goBack();
        }

        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 1,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <Wrapper>
                        <Typography>
                            *Пройдите проверку, если в окне отображается главная портала prom.ua, жмите "Далее"
                        </Typography>

                        <iframe title="iframe"
                                style={{width: '100%', height: '300px'}}
                                src="https://prom.ua"/>
                    </Wrapper>
                );
            case 1:
                return (
                    <Wrapper>
                        <Typography>
                            *В поле ниже нужно ввести значение куки.
                        </Typography>
                        <Typography>
                            Инструкция для браузера Chrome:
                        </Typography>
                        <Typography>
                            1. Перейдите в настройки браузера
                        </Typography>
                        <Typography>
                            2. В настройках (в самом низу) нажмите "Дополнительно"
                        </Typography>
                        <Typography>
                            3. Перейдите во вкладку "Настройка контента"
                        </Typography>
                        <Typography>
                            4. Перейдите во вкладку "Файлы Cookie"
                        </Typography>
                        <Typography>
                            5. Перейдите во вкладку "Все файлы cookie и данные сайта"
                        </Typography>
                        <Typography>
                            6. В поиске вбейте "prom"
                        </Typography>
                        <Typography>
                            7. Нажмите на вкладку "prom.ua" и найдите поле "ссс"
                        </Typography>
                        <Typography>
                            8. Раскройте вкладку и скопируйте значение из поля "Контент" (Пример:
                            "WlprCx8qSG2Oc3U0W1mD3rkZ6w9BRxrOIR5aERUzllPSxRfkeDjFedIGSPqEJEbQpqH1iW266xB2MRh9PzvDHw==")
                        </Typography>
                        <Typography>
                            9. Вставьте скопированное значение в поле ниже.
                        </Typography>
                        <TextField
                            fullWidth
                            onChange={this.setCookieHandler}
                            value={this.state.cookie}
                            placeholder="Вставьте Cookie"/>
                    </Wrapper>
                );

            default:
                return;
        }
    }

    render() {
        const {stepIndex} = this.state;
        let canNext = true;

        if (stepIndex === 1) {
            canNext = this.state.cookie.length;
        }

        return (
            <div style={styles.root}>
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Проверка</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Ввод</StepLabel>
                    </Step>
                </Stepper>
                <div style={styles.content}>
                    <p>{this.getStepContent(stepIndex)}</p>
                    <div style={{marginTop: 12}}>
                        <Button
                            disabled={stepIndex === 0}
                            onClick={this.handlePrev}
                            style={{marginRight: 12}}
                        >
                            Назад
                        </Button>
                        <Button
                            color="primary"
                            onClick={this.handleNext}
                            disabled={!canNext}
                        >
                            {stepIndex === 1 ? 'Готово' : 'Дальше'}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        settings: state.search.settings,
        result: state.search.resultProduct
    }
);

const mapDispatchToProps = dispatch => (
    {
        search: (query, maxCount) => dispatch(search(query, maxCount))
    }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Captcha));