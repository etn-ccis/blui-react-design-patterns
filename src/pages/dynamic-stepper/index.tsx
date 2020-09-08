import React, { useState, useCallback } from 'react';
import { useTheme, makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepContent from '@material-ui/core/StepContent';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

import Add from '@material-ui/icons/AddCircle';
import Delete from '@material-ui/icons/Delete';
import DeleteSweep from '@material-ui/icons/DeleteSweep';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';

import { Spacer } from '@pxblue/react-components';

import { useDispatch } from 'react-redux';
import { TOGGLE_DRAWER } from '../../redux/actions';

export const stepOptions: string[] = ['Buy Groceries', 'Cook Dinner', 'Go To Sleep', 'Go To Work', 'Wake Up'];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        addButton: {
            color: theme.palette.primary.main,
            transformOrigin: 'center',
            transform: 'scale(1.2)',
            '&.disabled': {
                color: theme.palette.text.disabled,
            },
        },
        appbarRoot: {
            padding: 0,
        },
        toolbarGutters: {
            padding: '0 16px',
        },
        deleteButton: {
            marginLeft: theme.spacing(1),
            color: theme.palette.text.primary,
            fontSize: 24,
        },
        stepIconText: {
            color: theme.palette.background.paper,
        },
        bottomButton: {
            marginTop: theme.spacing(3),
        },
        paddedContainer: {
            padding: theme.spacing(3),
        },
    })
);

export const DynamicStepper = (): JSX.Element => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();

    const [steps, setSteps] = useState([-1]); // -1 = 'waiting for user input', other = 'the user choice'
    const [activeStep, setActiveStep] = useState(0);
    const [finished, setFinished] = useState(false);

    const changeStepValue = useCallback(
        (index: number, choice: number): void => {
            const newSteps = [...steps];
            newSteps[index] = choice;
            setSteps(newSteps);
            setActiveStep(newSteps.length);
        },
        [steps]
    );

    const addStep = useCallback((): void => {
        const newSteps = [...steps];
        newSteps.push(-1);
        setSteps(newSteps);
        setActiveStep(newSteps.length - 1);
    }, [steps]);

    const removeStep = useCallback((): void => {
        const newSteps = [...steps];
        newSteps.splice(activeStep, 1);
        setSteps(newSteps);
        setActiveStep(steps.length);
    }, [steps, activeStep]);

    const reset = useCallback((): void => {
        setSteps([-1]);
        setActiveStep(0);
        setFinished(false);
    }, []);

    return (
        <div style={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh' }}>
            <AppBar data-cy="pxb-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    <Hidden mdUp={true}>
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                        >
                            <Menu />
                        </IconButton>
                    </Hidden>
                    <Typography variant={'h6'} color={'inherit'}>
                        Dynamic Stepper
                    </Typography>
                    <Spacer />
                    <Tooltip title={'Remove All Steps'}>
                        <IconButton
                            data-cy="remove all"
                            color={'inherit'}
                            edge={'end'}
                            onClick={(): void => setSteps([])}
                            id={'remove-all'}
                        >
                            <DeleteSweep />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <div data-cy={'reset-page'}>
                {finished && (
                    <div className={classes.paddedContainer}>
                        <Typography data-cy="success msg" variant={'body1'} color={'textPrimary'}>
                            Procedure created successfully.
                        </Typography>
                        <Button
                            variant={'contained'}
                            data-cy={'reset'}
                            color={'primary'}
                            className={classes.bottomButton}
                            onClick={reset}
                        >
                            Reset
                        </Button>
                    </div>
                )}
                {!finished && (
                    <>
                        <Stepper nonLinear activeStep={activeStep} orientation={'vertical'}>
                            {steps.map((choice, index) => (
                                <Step
                                    key={`step_${index}_container`}
                                    disabled={choice === -1 && index !== steps.length - 1}
                                >
                                    <StepButton
                                        onClick={(): void => {
                                            setActiveStep(index);
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant={'body1'}>
                                                {choice === -1 ? 'Choose an action' : stepOptions[choice]}
                                            </Typography>
                                            {activeStep === index && (
                                                <Tooltip
                                                    title={'Remove Step'}
                                                    data-cy={'remove-step'}
                                                    placement={'right'}
                                                >
                                                    <Delete className={classes.deleteButton} onClick={removeStep} />
                                                </Tooltip>
                                            )}
                                        </div>
                                    </StepButton>
                                    <StepContent>
                                        <FormControl component={'fieldset'}>
                                            <RadioGroup
                                                data-cy={'radiogroup'}
                                                aria-label={'action'}
                                                name={`action_${index}`}
                                                value={steps[index]}
                                                onChange={(evt): void =>
                                                    changeStepValue(index, parseInt(evt.target.value))
                                                }
                                            >
                                                {stepOptions.map((option, i) => (
                                                    <FormControlLabel
                                                        key={i}
                                                        value={i}
                                                        control={<Radio />}
                                                        label={<Typography variant={'body2'}>{option}</Typography>}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </StepContent>
                                </Step>
                            ))}
                            <Step
                                key={'add-a-step'}
                                data-cy={'addstep'}
                                disabled={steps.length > 0 && steps[steps.length - 1] === -1}
                            >
                                <StepButton
                                    icon={
                                        <Add
                                            className={
                                                classes.addButton +
                                                (steps.length > 0 && steps[steps.length - 1] === -1 ? ' disabled' : '')
                                            }
                                        />
                                    }
                                    onClick={addStep}
                                >
                                    <Typography variant={'body1'}>Add a Step</Typography>
                                </StepButton>
                            </Step>
                        </Stepper>
                        <Button
                            variant={'contained'}
                            data-cy={'done'}
                            color={'primary'}
                            style={{ marginLeft: theme.spacing(3) }}
                            onClick={(): void => setFinished(true)}
                        >
                            Done
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};
