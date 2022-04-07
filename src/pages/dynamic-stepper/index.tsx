import React, { useState, useCallback } from 'react';
import { useTheme, Theme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepContent from '@mui/material/StepContent';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';

import Add from '@mui/icons-material/AddCircle';
import Delete from '@mui/icons-material/Delete';
import DeleteSweep from '@mui/icons-material/DeleteSweep';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';

import { Spacer } from '@brightlayer-ui/react-components';

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
    const md = useMediaQuery(theme.breakpoints.up('md'));

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
            <AppBar data-cy="blui-toolbar" position={'sticky'} classes={{ root: classes.appbarRoot }}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    {md ? null : (
                        <IconButton
                            data-cy="toolbar-menu"
                            color={'inherit'}
                            onClick={(): void => {
                                dispatch({ type: TOGGLE_DRAWER, payload: true });
                            }}
                            edge={'start'}
                            style={{ marginRight: 20 }}
                            size="large"
                        >
                            <Menu />
                        </IconButton>
                    )}
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
                            size="large"
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
                        <Stepper
                            classes={{ root: classes.paddedContainer }}
                            nonLinear
                            activeStep={activeStep}
                            orientation={'vertical'}
                        >
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
